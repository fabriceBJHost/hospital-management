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
  const query = database.prepare(
    'INSERT INTO doctor (first_name, last_name, images, password, specialization, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )

  try {
    let hashedPassword = await bcryptjs.hash(password, 10)

    let response = await query.run(
      first_name,
      last_name,
      images,
      hashedPassword,
      specialization,
      phone,
      email
    )

    return response
  } catch (error) {
    return error
  }
}

/**
 * function to get all doctors in database
 * @returns {Promise}
 */
const getDoctors = async () => {
  const query = database.prepare('SELECT * FROM doctor')

  try {
    let response = await query.all()

    return response
  } catch (error) {
    return error
  }
}

/**
 * function to get single doctor by id
 * @param {Number} id
 * @returns {Promise}
 */
const getSingleDoctor = async (id) => {
  const query = database.prepare('SELECT * FROM doctor WHERE id = ?')

  try {
    let response = await query.get(id)

    return response
  } catch (error) {
    return error
  }
}

/**
 * function to delete doctor
 * @param {Number} id
 * @returns {Promise}
 */
const deleteDoctor = async (id) => {
  const query = database.prepare('DELETE FROM doctor WHERE id = ?')

  try {
    let response = await query.run(id)

    return response
  } catch (error) {
    return error
  }
}

module.exports = {
  insertDoctor,
  getDoctors,
  getSingleDoctor,
  deleteDoctor
}
