const { database } = require('../database')

/**
 * function to insert a new room into the database
 * @param {String} name
 * @param {String} type
 * @param {Number} floor
 * @param {Number} building
 * @param {String} status
 * @param {String} features
 * @returns {Promise<Object>}
 */
const insertRoom = async (name, type, floor, building, status, features) => {
  const query = `INSERT INTO rooms (name, type, floor, building, status, features) VALUES (?, ?, ?, ?, ?, ?)`

  try {
    const [result] = await database.query(query, [name, type, floor, building, status, features])

    if (result.affectedRows === 0) return { success: false, message: 'Failed to insert room' }

    return { success: true, roomId: result.insertId }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * function to insert a new bedroom into the database
 * @param {Number} room_id
 * @param {Number} bed_number
 * @param {String} status
 * @param {Number} assigned_patient_id
 * @returns {Promise<Object>}
 */
const insertBedroom = async (room_id, bed_number, status, assigned_patient_id) => {
  const query = `INSERT INTO bedrooms (room_id, bed_number, status, assigned_patient_id) VALUES (?, ?, ?, ?)`

  try {
    const [result] = await database.query(query, [room_id, bed_number, status, assigned_patient_id])

    if (result.affectedRows === 0) return { success: false, message: 'Failed to insert bedroom' }

    return { success: true, bedroomId: result.insertId }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * function to get all rooms
 * @returns {Promise<Object>}
 */
const getAllRooms = async () => {
  const query = `SELECT * FROM rooms`

  try {
    const [rows] = await database.query(query)

    return { success: true, data: rows }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * function to get all bedrooms
 * @returns {Promise<Object>}
 */
const getAllBedRooms = async () => {
  const query = `SELECT * FROM bedrooms`

  try {
    const [rows] = await database.query(query)
    return { success: true, data: rows }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

module.exports = {
  insertRoom,
  insertBedroom,
  getAllRooms,
  getAllBedRooms
}
