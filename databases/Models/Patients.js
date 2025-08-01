const { database } = require('../database')

/**
 * dunction to get all patients
 * @returns {Promise}
 */
const getAllPatients = async () => {
  const query = 'SELECT * FROM patients ORDER BY id DESC'

  try {
    const [rows] = await database.query(query)

    return { success: true, data: rows }
  } catch (error) {
    return { success: false, message: 'Error fetching patients', error }
  }
}

/**
 * function to get a single patient by ID
 * @param {Number} id
 * @returns {Promise}
 */
const getSinglePatient = async (id) => {
  const query = 'SELECT * FROM patients WHERE id = ?'

  try {
    const [rows] = await database.query(query, [id])

    return { success: true, data: rows[0] }
  } catch (error) {
    return { success: false, message: 'Error fetching patients', error }
  }
}

module.exports = {
  getAllPatients,
  getSinglePatient
}
