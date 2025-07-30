const { database } = require('../database')

/**
 * function to insert working date to doctor
 * @param {Object} working_date
 * @param {Object} doctor_id
 * @returns {Promise}
 */
const insertWorkingDays = async (working_date, doctor_id) => {
  const query = database.prepare('INSERT INTO working_day VALUES (?, ?)')

  try {
    let response = await query.run(working_date, doctor_id)

    return response
  } catch (error) {
    return error
  }
}

/**
 * function to get all working date
 * @returns {Promise}
 */
const getWorkingDate = async () => {
  const query = 'SELECT * FROM working_day'

  try {
    let [rows] = await database.query(query)

    return { success: true, data: rows }
  } catch (error) {
    return { success: false, message: 'Erreur ' + error.message }
  }
}

/**
 * function to get Single working date
 * @param {Number} id
 * @returns {Promise}
 */
const getSingleWorkingDate = async (id) => {
  const query = 'SELECT * FROM working_day WHERE id = ?'

  try {
    let [rows] = await database.query(query, [id])

    return { success: true, data: rows }
  } catch (error) {
    return { success: false, message: 'Erreur ' + error.message }
  }
}

module.exports = {
  insertWorkingDays,
  getWorkingDate,
  getSingleWorkingDate
}
