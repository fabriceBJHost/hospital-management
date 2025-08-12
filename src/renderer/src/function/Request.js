/**
 * function to get all users
 * @returns {Array}
 */
export const getAllUsers = async () => {
  const users = await window.users.getUsers()

  return users?.data
}

/**
 * function to insert new users
 * @param {Object} formData
 * @returns {Object}
 */
export const addNewUser = async (formData) => {
  const response = await window.users.insertNewUser(formData)

  return response
}

/**
 * function to delete user
 * @param {Object} id
 * @returns {Object}
 */
export const deleteUser = async (id) => {
  const response = await window.users.deleteUser(id)

  return response
}

/**
 * function to get single users
 * @param {Object} id
 * @returns {Object}
 */
export const getSingleUser = async (id) => {
  const response = await window.users.getSingleUser(id)

  return response?.data
}

/**
 * function to update users
 * @param {Object} formData
 * @returns {Object}
 */
export const updateUser = async (formData) => {
  const response = await window.users.updateUser(formData)

  return response
}

/**
 * function to get all doctors
 * @returns {Array}
 */
export const getAllDoctors = async () => {
  const response = await window.doctors.getAllDoctor()

  return response?.data
}

/**
 * function to insert doctor
 * @param {Object} formData
 * @returns {Object}
 */
export const insertDoctor = async (formData) => {
  const response = await window.doctors.insertDoctor(formData)

  return response
}

/**
 * function to get Single doctor
 * @param {Number} id
 * @returns {Object}
 */
export const getSIngleDoctor = async (id) => {
  const response = await window.doctors.getSingleDoctor(id)

  return response
}

/**
 * function to delete doctor
 * @param {Number} id
 * @returns {Object}
 */
export const deleteDoctor = async (id) => {
  const response = await window.doctors.deleteDoctor(id)

  return response
}

/**
 * function to get all working date from server
 * @returns {Array}
 */
export const getWorkingDate = async () => {
  const response = await window.workDay.getAllWorkingDate()

  return response?.data
}

/**
 * function to insert working date
 * @param {Object} formData
 * @returns {Object}
 */
export const insertWorkingDate = async (formData) => {
  const response = await window.workDay.insertWorkingDate(formData)

  return response
}

/**
 * function to get all patients from backend
 * @returns {Array}
 */
export const getAllParients = async () => {
  const response = await window.patients.getAllPatients()

  return response?.data
}

/**
 * function to all rooms
 * @returns {Array}
 */
export const getAllRoom = async () => {
  const response = await window.roomBedroom.getAllRooms()

  return response?.data
}

/**
 * function to get all bedrooms
 * @returns {Array}
 */
export const getAllBedRoom = async () => {
  const response = await window.roomBedroom.getAllBedrooms()

  return response?.data
}

/**
 * function to insert new room
 * @param {Object} formData
 * @returns {Object}
 */
export const insertRoom = async (formData) => {
  const response = await window.roomBedroom.insertRoom(formData)

  return response
}

/**
 * function to insert new berRoom
 * @param {Object} formData
 * @returns {Object}
 */
export const insertBedRoom = async (formData) => {
  const response = await window.roomBedroom.insertBedroom(formData)

  return response
}
