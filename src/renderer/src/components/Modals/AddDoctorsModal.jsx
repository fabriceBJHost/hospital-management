import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import {
  FaAddressCard,
  FaBriefcase,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaKey,
  FaPhone,
  FaUserMd
} from 'react-icons/fa'
import { handleFileChange } from '../../function/FunctionHelper'
import classe from '../../assets/css/Users.module.css'
import { validationAddDoctor } from '../../function/Validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertDoctor } from '../../function/Request'

const AddDoctorsModal = ({ open, handleClose, setOpenSnack, setOpenSnackError }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    images: null,
    image: null,
    password: '',
    specialization: '',
    phone: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'images') {
      setFormData((prev) => ({
        ...prev,
        images: files[0] || null
      }))

      handleFileChange(files[0], (base64) => {
        setFormData((prev) => ({
          ...prev,
          image: base64
        }))
      })
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const [seePassword, setSeePassword] = useState(false)
  const togglePasswordVisibility = () => {
    setSeePassword(!seePassword)
  }

  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({
    first_name: false,
    last_name: false,
    password: false,
    specialization: false,
    phone: false,
    email: false
  })

  const handleInput = (e) => {
    const { name } = e.target

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true
    }))
  }

  useEffect(() => {
    setErrors(validationAddDoctor(formData))
  }, [formData])

  const queryclient = useQueryClient()

  const mutation = useMutation({
    mutationFn: insertDoctor,
    onSuccess: (data) => {
      if (data && data.success) {
        setOpenSnack(true)
        handleClose(true)
        queryclient.invalidateQueries({ queryKey: ['Doctors'] })
        setFormData({
          first_name: '',
          last_name: '',
          images: null,
          image: null,
          password: '',
          specialization: '',
          phone: '',
          email: ''
        })
        setErrors({})
        setTouchedFields({
          first_name: false,
          last_name: false,
          password: false,
          specialization: false,
          phone: false,
          email: false
        })
      } else if (data && !data.success) {
        errors.email = 'Email doit être unique'
        setOpenSnackError(true)
        setTouchedFields((prev) => ({
          ...prev,
          email: true
        }))
      } else {
        setOpenSnackError(true)
      }
    },
    onError: () => {
      setOpenSnackError(true)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.keys(errors).length == 0) {
      mutation.mutate(formData)
    } else {
      setTouchedFields({
        first_name: true,
        last_name: true,
        password: true,
        specialization: true,
        phone: true,
        email: true
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: 'primary.main' }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <FaUserMd /> Ajouter une nouveau Médecin
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box alignItems={'center'} justifyContent={'center'} display={'flex'}>
          {formData.images && (
            <Avatar
              src={URL.createObjectURL(formData.images)}
              alt="Preview"
              sx={{
                marginTop: '1rem',
                width: 150,
                height: 150,
                border: 'solid 3px #1976d2'
              }}
              imgProps={{
                style: {
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }
              }}
            />
          )}
        </Box>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Nom"
              name="last_name"
              margin="dense"
              error={touchedFields.last_name && Boolean(errors.last_name)}
              helperText={touchedFields.last_name && errors.last_name ? errors.last_name : ''}
              value={formData.last_name}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Entrer le nom"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUserMd className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Prénom"
              name="first_name"
              margin="dense"
              error={touchedFields.first_name && Boolean(errors.first_name)}
              helperText={touchedFields.first_name && errors.first_name ? errors.first_name : ''}
              value={formData.first_name}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Entrer le prénom"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaAddressCard className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Spécialization"
              name="specialization"
              margin="dense"
              error={touchedFields.specialization && Boolean(errors.specialization)}
              helperText={
                touchedFields.specialization && errors.specialization ? errors.specialization : ''
              }
              value={formData.specialization}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Entrer la spécialiter"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaBriefcase className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              margin="dense"
              error={touchedFields.email && Boolean(errors.email)}
              helperText={touchedFields.email && errors.email ? errors.email : ''}
              value={formData.email}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Entrer l'Email"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEnvelope className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Téléphone"
              name="phone"
              margin="dense"
              error={touchedFields.phone && Boolean(errors.phone)}
              helperText={touchedFields.phone && errors.phone ? errors.phone : ''}
              value={formData.phone}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Entrer le contact"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPhone className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Mot de Passe"
              name="password"
              margin="dense"
              error={touchedFields.password && Boolean(errors.password)}
              helperText={touchedFields.password && errors.password ? errors.password : ''}
              value={formData.password}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              type={seePassword ? 'text' : 'password'}
              placeholder="Entrer le Mot de passe"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaKey className={classe.iconStarter} />
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
                    borderColor: 'primary.main'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
          </Grid>
          <Grid size={12}>
            <Button variant="contained" fullWidth component="label" startIcon={<FaImage />}>
              Ajouter une Image
              <input type="file" hidden name="images" accept="image/*" onChange={handleChange} />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
AddDoctorsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setOpenSnack: PropTypes.func.isRequired,
  setOpenSnackError: PropTypes.func.isRequired
}

export default AddDoctorsModal
