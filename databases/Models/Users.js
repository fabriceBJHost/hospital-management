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
const register = async (username, password, role, images) => {
  const query = database.prepare(
    'INSERT INTO users (username, password, role, images) VALUES (?, ?, ?, ?)'
  )
  const saltRounds = 10

  try {
    let hashedPassword = await bcryptjs.hash(password, saltRounds)

    let response = query.run(username, hashedPassword, role, images)

    return response
  } catch (error) {
    return error
  }
}

/**
 * function to let user login
 * @param {String} username
 * @param {String} password
 * @returns {Promise}
 */
const login = async (username, password) => {
  const query = database.prepare('SELECT * FROM users WHERE LOWER(username) = ?')

  try {
    let user = await query.get(username.toLowerCase())

    if (user) {
      let isPasswordValid = await bcryptjs.compare(password, user.password)

      if (isPasswordValid) {
        return user
      } else {
        return { errorPassword: 'Mot de passe ne correspond pas' }
      }
    } else {
      return { errorUsername: 'Utilisateur non trouver' }
    }
  } catch (error) {
    return error
  }
}

/**
 * function who get all users
 * @returns {Promise}
 */
const getAll = () => {
  const query = database.prepare('SELECT * FROM users')

  try {
    let response = query.all()

    return response
  } catch (error) {
    return error
  }
}

/**
 * function who delete one users
 * @param {Number} id
 * @returns
 */
const deleteUsers = async (id) => {
  const query = database.prepare('DELETE FROM users WHERE id = ?')

  try {
    let response = await query.run(id)

    return response
  } catch (error) {
    return error
  }
}

module.exports = {
  register,
  login,
  getAll,
  deleteUsers
}
