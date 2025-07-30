const { database } = require('../database')
const bcryptjs = require('bcryptjs')

/**
 * function to insert doctor in database
 * @param {String} first_name
 * @param {String} last_name
 * @param {String} images
 * @param {String} password
 * @param {String} specialization
 * @param {String} phone
 * @param {String} email
 * @returns {Promise}
 */
const insertDoctor = async (
  first_name,
  last_name,
  images,
  password,
  specialization,
  phone,
  email
) => {
  const query =
    'INSERT INTO doctor (first_name, last_name, images, password, specialization, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)'

  try {
    let hashedPassword = await bcryptjs.hash(password, 10)

    let [result] = await database.query(query, [
      first_name,
      last_name,
      images,
      hashedPassword,
      specialization,
      phone,
      email
    ])

    return {
      success: true,
      id: result.insertId
    }
  } catch (error) {
    return { success: false, message: 'Erreur ' + error.message }
  }
}

/**
 * function to get all doctors in database
 * @returns {Promise}
 */
const getDoctors = async () => {
  const query = 'SELECT * FROM doctor ORDER BY id DESC'

  try {
    let [rows] = await database.query(query)

    return { success: true, data: rows }
  } catch (error) {
    return { success: false, message: 'Échec de la récupération des médecins ' + error.message }
  }
}

/**
 * function to get single doctor by id
 * @param {Number} id
 * @returns {Promise}
 */
const getSingleDoctor = async (id) => {
  const query = 'SELECT * FROM doctor WHERE id = ?'

  try {
    let [rows] = await database.query(query, [id])

    if (rows.length === 0) {
      return { success: false, message: 'Médecin non trouvé.' }
    }

    return { success: true, data: rows[0] }
  } catch (error) {
    return { success: false, message: 'Échec de la récupération du médecins ' + error.message }
  }
}

/**
 * function to delete doctor
 * @param {Number} id
 * @returns {Promise}
 */
const deleteDoctor = async (id) => {
  const query = 'DELETE FROM doctor WHERE id = ?'

  try {
    let [result] = await database.query(query, [id])

    if (result.affectedRows === 0) {
      return { success: false, message: 'Médecin non trouvé.' }
    }
    return { success: true, message: 'Médecin supprimé avec succès.' }
  } catch (error) {
    return { success: false, message: 'Échec de la suppression du médecin ' + error.message }
  }
}

module.exports = {
  insertDoctor,
  getDoctors,
  getSingleDoctor,
  deleteDoctor
}
