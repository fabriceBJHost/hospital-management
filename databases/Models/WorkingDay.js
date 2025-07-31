const { database } = require('../database')

/**
 * function to insert working date to doctor
 * @param {Array} working_dates
 * @param {Array} doctor_ids
 * @returns {Promise}
 */
const insertWorkingDays = async (working_dates, doctor_ids) => {
  const query = `INSERT INTO working_day (working_date, doctor_id) VALUES ? ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`
  const values = []

  for (const doctor_id of doctor_ids) {
    for (const date of working_dates) {
      values.push([date, doctor_id])
    }
  }

  try {
    const [result] = await database.query(query, [values])

    return { success: true, message: 'Dates enregistrées avec succès', result }
  } catch (error) {
    return { success: false, message: 'Erreur ' + error.message }
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

    return { success: true, data: rows[0] }
  } catch (error) {
    return { success: false, message: 'Erreur ' + error.message }
  }
}

module.exports = {
  insertWorkingDays,
  getWorkingDate,
  getSingleWorkingDate
}
