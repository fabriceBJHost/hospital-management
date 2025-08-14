import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField
} from '@mui/material'
import { FaDoorOpen, FaCheckCircle, FaBuilding, FaClipboardList, FaHashtag } from 'react-icons/fa'
import { FaStairs } from 'react-icons/fa6'
import PropTypes from 'prop-types'
import classe from '../../assets/css/Users.module.css'
import { useEffect, useState } from 'react'
import { validateInsertRoom } from '../../function/Validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertRoom } from '../../function/Request'

const AddRooms = ({ open, handleClose, setOpenSnack, setOpenSnackError }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Standard',
    floor: '',
    building: '',
    status: 'Disponible',
    features: ''
  })

  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    floor: false,
    building: false
  })

  const handleInput = (e) => {
    const { name } = e.target

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true
    }))
  }

  useEffect(() => {
    setErrors(validateInsertRoom(formData))
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const queryclient = useQueryClient()
  const mutation = useMutation({
    mutationFn: insertRoom,
    onSuccess: (data) => {
      if (data && data.success) {
        setOpenSnack(true)
        handleClose(true)
        queryclient.invalidateQueries({ queryKey: ['Rooms'] })
        setFormData({
          name: '',
          type: 'Standard',
          floor: '',
          building: '',
          status: 'Disponible',
          features: null
        })
        setErrors({})
        setTouchedFields({
          name: false,
          floor: false,
          building: false
        })
      } else if (data && !data.success) {
        setOpenSnackError(true)
      }
    },
    onError: () => {
      setOpenSnackError(true)
    }
  })

  const handleSubmit = async () => {
    if (Object.keys(errors).length == 0) {
      mutation.mutate(formData)
    } else {
      setTouchedFields({
        name: true,
        floor: true,
        building: true
      })
    }
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: 'primary.main' }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <FaDoorOpen /> Ajouter un nouveau chambre
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Nom de la Chambre"
              placeholder="Entrez le nom de la chambre"
              name="name"
              fullWidth
              error={touchedFields.name && Boolean(errors.name)}
              helperText={touchedFields.name && errors.name ? errors.name : ''}
              value={formData.name}
              margin="dense"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDoorOpen className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
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
              label="Types"
              name="type"
              value={formData.type}
              onChange={(e) => {
                handleChange(e)
              }}
              fullWidth
              margin="dense"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaCheckCircle className={classe.iconStarter} />
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
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="Soins Intensifs">Soins Intensifs</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Isolement">Isolement</MenuItem>
              <MenuItem value="Maternité">Maternité</MenuItem>
            </TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              label="Batiment"
              placeholder="Entrez le nom du batiment"
              name="building"
              fullWidth
              error={touchedFields.building && Boolean(errors.building)}
              helperText={touchedFields.building && errors.building ? errors.building : ''}
              value={formData.building}
              margin="dense"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaBuilding className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
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
              label="Etage"
              placeholder="Entrez l'étage"
              name="floor"
              fullWidth
              error={touchedFields.floor && Boolean(errors.floor)}
              helperText={touchedFields.floor && errors.floor ? errors.floor : ''}
              value={formData.floor}
              type="number"
              margin="dense"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaStairs className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
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
            <TextField
              select
              label="Statut"
              name="status"
              fullWidth
              value={formData.status}
              margin="dense"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaClipboardList className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              onChange={(e) => {
                handleChange(e)
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
              <MenuItem value="Disponible">Disponible</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Plein">Plein</MenuItem>
            </TextField>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Features"
              name="features"
              fullWidth
              margin="dense"
              value={formData.features}
              placeholder="ex: Climatisation, Salle de bain privée"
              multiline
              rows={2}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaHashtag className={classe.iconStarter} />
                    </InputAdornment>
                  )
                }
              }}
              onChange={(e) => {
                handleChange(e)
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
AddRooms.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setOpenSnack: PropTypes.func.isRequired,
  setOpenSnackError: PropTypes.func.isRequired
}

export default AddRooms
