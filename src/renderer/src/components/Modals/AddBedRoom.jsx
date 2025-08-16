import {
  Autocomplete,
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
import { useEffect, useState } from 'react'
import { FaDoorOpen } from 'react-icons/fa'
import classe from '../../assets/css/Users.module.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllRoom, insertBedRoom } from '../../function/Request'
import PropTypes from 'prop-types'
import { validateInsertBedRoom } from '../../function/Validation'

const AddBedRoom = ({ open, handleClose, setOpenSnack, setOpenSnackError }) => {
  const [formData, setFormData] = useState({
    room_id: '',
    bed_number: '',
    status: 'Disponible'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleInput = (e) => {
    const { name } = e.target

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true
    }))
  }

  useEffect(() => {
    setErrors(validateInsertBedRoom(formData))
  }, [formData])

  const { data: rooms = [] } = useQuery({
    queryKey: ['Rooms'],
    queryFn: getAllRoom
  })

  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({
    room_id: false,
    bed_number: false
  })

  const queryclient = useQueryClient()
  const mutation = useMutation({
    mutationFn: insertBedRoom,
    onSuccess: (data) => {
      if (data && data.success) {
        setOpenSnack(true)
        handleClose(true)
        queryclient.invalidateQueries({ queryKey: ['BedRooms'] })
        setFormData({
          room_id: '',
          bed_number: '',
          status: 'Disponible'
        })
        setErrors({})
        setTouchedFields({
          room_id: false,
          bed_number: false
        })
      } else if (data && !data.success) {
        setOpenSnackError(true)
      }
    },
    onError: () => {
      setOpenSnackError(true)
    }
  })

  const handleSubmit = () => {
    if (Object.keys(errors).length === 0) {
      mutation.mutate(formData)
    } else {
      setTouchedFields({
        room_id: true,
        bed_number: true
      })
    }
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: 'primary.main' }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <FaDoorOpen /> Ajouter un nouveau lit
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Autocomplete
              options={rooms}
              value={rooms.find((r) => r.id === formData.room_id) || null}
              getOptionLabel={(option) =>
                option
                  ? `${option.building} ${option.name} ${option.type} étage: ${option.floor}`
                  : ''
              }
              key={rooms.id}
              isOptionEqualToValue={(option, value) => option.id === value.id} // 🔹 prevents mismatch
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  room_id: newValue ? newValue.id : '' // Store the ID of the selected mention
                }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chambres"
                  placeholder="Sélectionner les chambres"
                  margin="dense"
                  error={touchedFields.room_id && Boolean(errors.room_id)}
                  helperText={touchedFields.room_id && errors.room_id ? errors.room_id : ''}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <FaDoorOpen className={classe.iconStarter} />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    )
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
              )}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              name="bed_number"
              label="Numéro du lit"
              value={formData.bed_number}
              onChange={(e) => {
                handleChange(e)
                handleInput(e)
              }}
              error={touchedFields.bed_number && Boolean(errors.bed_number)}
              helperText={touchedFields.bed_number && errors.bed_number ? errors.bed_number : ''}
              placeholder="Numéro du lit"
              fullWidth
              margin="dense"
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDoorOpen className={classe.iconStarter} />
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
            <TextField
              select
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Status du lit"
              fullWidth
              margin="dense"
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDoorOpen className={classe.iconStarter} />
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
              <MenuItem value="Disponible">Disponible</MenuItem>
              <MenuItem value="Occupé">Occupé</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </TextField>
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
AddBedRoom.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setOpenSnack: PropTypes.func.isRequired,
  setOpenSnackError: PropTypes.func.isRequired
}

export default AddBedRoom
