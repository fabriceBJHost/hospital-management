import { Box, Button, Container, Grid, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import classe from '../assets/css/Login.module.css'
import { FaEye, FaEyeSlash, FaKey, FaUser, FaUserCircle } from 'react-icons/fa'
import { LoginValidation } from '../function/Validation'
import ErrorLoginModal from './Modals/ErrorLoginModal'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { setUser, setToken } = useStateContext()

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [seePassword, setSeePassword] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setSeePassword(!seePassword)
  }

  /**
   * function to handle form input changes
   * @param {Object} e - The event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    const updatedFormData = {
      ...formData,
      [name]: value
    }

    setFormData(updatedFormData)

    // Mark the field as touched
    setTouched({
      ...touched,
      [name]: true
    })

    // Validate and update only relevant field error
    const validationErrors = LoginValidation(updatedFormData)
    setErrors(validationErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = LoginValidation(formData)
    // Validate the entire form on submit
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission logic, e.g., API call
      let response = await window.session.setSession(formData)
      console.log(response)
      if (response.success) {
        // Clear form data and errors on successful login
        setFormData({
          username: '',
          password: ''
        })
        setErrors({})
        setTouched({})
        setShowErrorModal(false)
        setUser(JSON.stringify(response.session.user))
        setToken(response.session.token)
        // Optionally redirect or show success message
        navigate('/dashboard') // Redirect to dashboard or home page
      } else {
        setShowErrorModal(true)
      }
    } else {
      // Set touched state for all fields to show errors
      setTouched({
        username: true,
        password: true
      })
      setErrors(validationErrors)
    }
  }
  return (
    <Container maxWidth="xl">
      <ErrorLoginModal open={showErrorModal} close={() => setShowErrorModal(false)} />

      <Box sx={{ flexGrow: 1, minHeight: '100vh' }} className={classe.loginContainer}>
        <form className={classe.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid
              size={12}
              sx={{ textAlign: 'center', marginBottom: '10px', fontSize: '3rem', color: '#1976d2' }}
            >
              <FaUserCircle />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Nom d'utilisateur"
                variant="outlined"
                fullWidth
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username ? errors.username : ''}
                value={formData.username}
                onChange={handleChange}
                name="username"
                color="primary"
                placeholder="Entrez votre nom d'utilisateur"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUser />
                      </InputAdornment>
                    )
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor:
                        touched.username && errors.username ? 'error.main' : 'primary.main'
                    },
                    '&:hover fieldset': {
                      borderColor:
                        touched.username && errors.username ? 'error.main' : 'primary.main'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor:
                        touched.username && errors.username ? 'error.main' : 'primary.main'
                    }
                  }
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Mot de passe"
                variant="outlined"
                fullWidth
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password ? errors.password : ''}
                value={formData.password}
                onChange={handleChange}
                name="password"
                color="primary"
                type={seePassword ? 'text' : 'password'}
                placeholder="Entrez votre mot de passe"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaKey />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {seePassword ? (
                          <FaEyeSlash onClick={togglePasswordVisibility} className={classe.icon} />
                        ) : (
                          <FaEye onClick={togglePasswordVisibility} className={classe.icon} />
                        )}
                      </InputAdornment>
                    )
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor:
                        touched.password && errors.password ? 'error.main' : 'primary.main'
                    },
                    '&:hover fieldset': {
                      borderColor:
                        touched.password && errors.password ? 'error.main' : 'primary.main'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor:
                        touched.password && errors.password ? 'error.main' : 'primary.main'
                    }
                  }
                }}
              />
            </Grid>
            <Grid size={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Se connecter
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default Login
