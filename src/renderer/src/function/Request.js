/**
 * function to get all users
 * @returns {Object}
 */
export const getAllUsers = async () => {
  const users = await window.users.getUsers()

  return users
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

  return response
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
