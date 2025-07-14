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
