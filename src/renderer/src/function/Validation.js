/**
 * function to validate login form inputs
 * @function LoginValidation
 * @param {Object} values - The values of the form inputs
 * @returns {Object} errors - An object containing validation errors
 */
export const LoginValidation = (values) => {
  const errors = {}

  if (!values.username) {
    errors.username = "Le nom d'utilisateur est requis"
  } else if (values.username.length < 3) {
    errors.username = "Le nom d'utilisateur doit comporter au moins 3 caractères"
  }

  if (!values.password) {
    errors.password = 'Le mot de passe est requis'
  } else if (values.password.length < 6) {
    errors.password = 'Le mot de passe doit comporter au moins 6 caractères'
  }

  return errors
}

/**
 * function who validate add new users
 * @param {Object} values
 * @returns {Object}
 */
export const addUsersValidation = (values) => {
  const errors = {}

  if (!values.username) {
    errors.username = "Le nom d'utilisateur est requis"
  } else if (values.username.length < 3) {
    errors.username = "Le nom d'utilisateur doit comporter au moins 3 caractères"
  }

  if (!values.password) {
    errors.password = 'Le mot de passe est requis'
  } else if (values.password.length < 6) {
    errors.password = 'Le mot de passe doit comporter au moins 6 caractères'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Le mot de passe de confirmation est requis'
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Le mot de passe ne correspond pas'
  }

  return errors
}

/**
 * function who validate update users
 * @param {Object} values
 * @returns {Object}
 */
export const updateUsersValidation = (values) => {
  const errors = {}

  if (!values.username) {
    errors.username = "Le nom d'utilisateur est requis"
  } else if (values.username.length < 3) {
    errors.username = "Le nom d'utilisateur doit comporter au moins 3 caractères"
  }

  if (values.password) {
    if (values.password.length < 6) {
      errors.password = 'Le mot de passe doit comporter au moins 6 caractères'
    } else {
      delete errors.password
    }
  } else {
    delete errors.password
  }

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Le mot de passe ne correspond pas'
  }

  return errors
}

/**
 * validation to the insert doctor form
 * @param {Object} formData
 * @returns {Object}
 */
export const validationAddDoctor = (formData) => {
  const errors = {}

  if (!formData.last_name) {
    errors.last_name = 'Le Nom est requis'
  } else if (formData.last_name.length < 3) {
    errors.last_name = 'Le Nom doit comporter au moins 3 caractères'
  }

  if (!formData.first_name) {
    errors.first_name = 'Le Prénom est requis'
  } else if (formData.first_name.length < 3) {
    errors.first_name = 'Le Prénom doit comporter au moins 3 caractères'
  }

  if (!formData.password) {
    errors.password = 'Le Mot de passe est requis'
  } else if (formData.password.length < 6) {
    errors.password = 'Le Mot de passe doit comporter au moins 6 caractères'
  }

  if (!formData.phone) {
    errors.phone = 'Le Téléphone est requis'
  } else if (formData.phone.length != 10) {
    errors.phone = 'Le Téléphone doit comporter 10 caractères'
  }

  if (!formData.email) {
    errors.email = "L'Email est requis"
  }

  if (!formData.specialization) {
    errors.specialization = 'La spécialiter est requis'
  }

  return errors
}

/**
 * function who validate add working date
 * @param {Object} formData
 * @returns {Object}
 */
export const validationAddWorkingDate = (formData) => {
  const errors = {}

  if (formData.dates.length === 0) {
    errors.dates = 'La date de travail est requise'
  }

  if (formData.doctorIds.length === 0) {
    errors.doctorIds = 'Le médecin est requis'
  }

  return errors
}
