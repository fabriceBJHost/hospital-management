const { database } = require('../database')
const bcryptjs = require('bcryptjs')

/**
 * Insère un nouvel utilisateur dans la base de données après avoir haché le mot de passe.
 *
 * @async
 * @function register
 * @param {string} username - Le nom d'utilisateur à enregistrer.
 * @param {string} password - Le mot de passe en clair à hacher avant l'enregistrement.
 * @param {string} role - Le rôle attribué à l'utilisateur (ex. : 'admin', 'user').
 * @returns {Promise<Object>} Une promesse qui résout un objet contenant le résultat de l'insertion,
 * ou une erreur en cas d'échec.
 */
async function register(username, password, role, images) {
  const query = 'INSERT INTO users (username, password, role, images) VALUES (?, ?, ?, ?)'
  const saltRounds = 10

  try {
    let hashedPassword = await bcryptjs.hash(password, saltRounds)

    let [result] = await database.query(query, [username, hashedPassword, role, images])

    return {
      success: true,
      id: result.insertId
    }
  } catch (error) {
    return {
      success: false,
      message: "Échec de l'enregistrement de l'utilisateur " + error.message
    }
  }
}

/**
 * function to let user login
 * @param {String} username
 * @param {String} password
 * @returns {Promise<Object>}
 */
async function login(username, password) {
  const query = 'SELECT * FROM users WHERE LOWER(username) = ?'

  try {
    const [rows] = await database.query(query, [username.toLowerCase()])

    const user = rows[0] // get the first matching user

    if (user) {
      const isPasswordValid = await bcryptjs.compare(password, user.password)

      if (isPasswordValid) {
        return user
      } else {
        return { errorPassword: 'Mot de passe ne correspond pas' }
      }
    } else {
      return { errorUsername: 'Utilisateur non trouvé' }
    }
  } catch (error) {
    return { error: 'Erreur lors de la connexion', details: error.message }
  }
}

/**
 * function who get all users
 * @returns {Promise<Object>}
 */
async function getAll() {
  const query = `SELECT * FROM users`

  try {
    let [rows] = await database.query(query)

    return { success: true, data: rows }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

/**
 * function who delete one users
 * @param {Number} id
 * @returns {Promise<Object>}
 */
async function deleteUsers(id) {
  const query = 'DELETE FROM users WHERE id = ?'

  try {
    let [result] = await database.query(query, [id])

    if (result.affectedRows === 0) {
      return { success: false, message: 'Utilisateur non trouvé.' }
    }

    return { success: true, message: 'Utilisateur supprimé avec succès.' }
  } catch (error) {
    return error
  }
}

/**
 * function to get single user
 * @param {Number} id
 * @returns {Promise<Object>}
 */
async function getSingleUser(id) {
  const query = 'SELECT * FROM users WHERE id = ?'

  try {
    let [rows] = await database.query(query, [id])

    if (rows.length === 0) {
      return { success: false, message: 'Utilisateur non trouvé.' }
    }

    return { success: true, data: rows[0] }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

/**
 * function to update users by id
 * @param {String} username
 * @param {String} password
 * @param {String} role
 * @param {String} images
 * @param {Number} id
 * @returns {Promise<Object>}
 */
async function updateUsers(username, password, role, images, id) {
  try {
    let sql
    let params

    if (password && password.trim() !== '') {
      // Hash the password if it’s provided
      const hashedPassword = await bcryptjs.hash(password, 10)

      sql = `
        UPDATE users SET username = ?, password = ?, role = ?, images = ? WHERE id = ?
      `
      params = [username, hashedPassword, role, images, id]
    } else {
      // Don’t touch the password if not provided
      sql = `
        UPDATE users SET username = ?, role = ?, images = ? WHERE id = ?
      `
      params = [username, role, images, id]
    }

    // Perform the update
    const [result] = await database.query(sql, params)
    const [rows] = await database.query('SELECT * FROM users WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: 'Aucune mise à jour effectuée'
      }
    }

    return { success: true, message: 'Utilisateur mis à jour avec succès.', data: rows[0] }
  } catch (error) {
    return {
      success: false,
      message: 'Erreur lors de la mise à jour de l’utilisateur.',
      error: error.message
    }
  }
}

module.exports = {
  register,
  login,
  getAll,
  deleteUsers,
  getSingleUser,
  updateUsers
}
