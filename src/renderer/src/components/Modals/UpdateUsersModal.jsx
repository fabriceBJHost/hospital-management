import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
  Grid,
  Avatar,
  Box
} from '@mui/material'
import PropTypes from 'prop-types'
import { handleFileChange } from '../../function/FunctionHelper'
import { useEffect, useState } from 'react'
import { updateUsersValidation } from '../../function/Validation'
import {
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaKey,
  FaLock,
  FaUser,
  FaUserShield
} from 'react-icons/fa'
import classe from '../../assets/css/Users.module.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSingleUser, updateUser } from '../../function/Request'
import { useStateContext } from '../../context/AuthContext'

const UpdateUsersModal = ({ open, handleClose, setOpenSnack, id, setOpenSnackError }) => {
  const { setUser } = useStateContext()
  const { data: user = {} } = useQuery({
    queryKey: ['fetchSingleUsersUpdate', id], // add id for uniqueness
    queryFn: () => getSingleUser({ id }),
    enabled: !!id
  })

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    role: '',
    images: null,
    image: '',
    id: ''
  })

  useEffect(() => {
    if (user?.username) {
      setFormData((prev) => ({
        ...prev,
        username: user.username,
        role: user.role,
        image: user.images,
        id: user.id
      }))
    }
  }, [user])

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

  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({
    username: false,
    password: false,
    passwordConfirmation: false
  })

  const handleInput = (e) => {
    const { name } = e.target

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true
    }))
  }

  useEffect(() => {
    setErrors(updateUsersValidation(formData))
  }, [formData])

  const queryclient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (data && data.code) {
        setOpenSnackError(true)
      } else {
        setOpenSnack(true)
        handleClose(true)
        queryclient.invalidateQueries({ queryKey: ['Users'] })
        setUser(JSON.stringify(data))
        setErrors({})
        setTouchedFields({
          username: false,
          password: false,
          passwordConfirmation: false
        })
      }
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.keys(errors).length == 0) {
      mutation.mutate(formData)
    } else {
      setTouchedFields({
        username: true,
        password: true,
        passwordConfirmation: true
      })
    }
  }

  const [seePassword, setSeePassword] = useState(false)
  const togglePasswordVisibility = () => {
    setSeePassword(!seePassword)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: 'primary.main' }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <FaEdit /> Modification d&apos;Utilisateur
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box alignItems={'center'} justifyContent={'center'} display={'flex'}>
          {formData.images !== null ? (
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
          ) : (
            <Avatar
              src={formData.image}
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
              label="Username"
              name="username"
              margin="dense"
              error={touchedFields.username && Boolean(errors.username)}
              helperText={touchedFields.username && errors.username ? errors.username : ''}
              value={formData.username}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Entrer le nom d'utilisateur"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser className={classe.iconStarter} />
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
              select
              label="Rôle"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              disabled
              margin="dense"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUserShield className={classe.iconStarter} />
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
            >
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              label="Mot de passe"
              name="password"
              type={seePassword ? 'text' : 'password'}
              margin="dense"
              value={formData.password}
              error={touchedFields.password && Boolean(errors.password)}
              helperText={
                touchedFields.password && errors.password
                  ? errors.password
                  : 'a laisser vide si vous ne voulez pas le modifier'
              }
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Entrer le mot de passe"
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
          <Grid size={6}>
            <TextField
              label="Mot de passe de Confirmation"
              name="passwordConfirmation"
              type="password"
              margin="dense"
              value={formData.passwordConfirmation}
              error={touchedFields.passwordConfirmation && Boolean(errors.passwordConfirmation)}
              helperText={
                touchedFields.passwordConfirmation && errors.passwordConfirmation
                  ? errors.passwordConfirmation
                  : ''
              }
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              fullWidth
              placeholder="Confirmez le mot de passe"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock className={classe.iconStarter} />
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
UpdateUsersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setOpenSnack: PropTypes.func.isRequired,
  setOpenSnackError: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
}
export default UpdateUsersModal
