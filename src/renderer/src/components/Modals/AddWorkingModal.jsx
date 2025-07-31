import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material'
import { FaCalendarAlt, FaUserMd } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getAllDoctors, insertWorkingDate } from '../../function/Request'
import { useQuery } from '@tanstack/react-query'
import classe from '../../assets/css/Users.module.css'
import dayjs from 'dayjs'
import { validationAddWorkingDate } from '../../function/Validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AddWorkingModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({ dates: [], doctorIds: [] })
  const [dateInput, setDateInput] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmited, setIsSubmited] = useState(false)

  const { data: doctors = [] } = useQuery({
    queryKey: ['Doctors'],
    queryFn: getAllDoctors
  })

  useEffect(() => {
    isSubmited && setErrors(validationAddWorkingDate(formData))
  }, [formData, isSubmited])

  const handleAddDate = () => {
    if (dateInput && !formData.dates.includes(dateInput)) {
      setFormData({ ...formData, dates: [...formData.dates, dateInput] })
      setDateInput('')
    }
  }

  const handleRemoveDate = (dateToRemove) => {
    setFormData({
      ...formData,
      dates: formData.dates.filter((d) => d !== dateToRemove)
    })
  }

  const queryclient = useQueryClient()

  const mutation = useMutation({
    mutationFn: insertWorkingDate,
    onSuccess: (data) => {
      if (data.success) {
        queryclient.invalidateQueries(['WorkingDay'])
        handleClose()
        setIsSubmited(false)
        setFormData({ dates: [], doctorIds: [] })
        setErrors({})
        setDateInput('')
      }
    },
    onError: (error) => {
      console.error('Error inserting working date:', error)
    }
  })

  const handleSubmit = async () => {
    setIsSubmited(true)
    if (Object.keys(errors).length == 0) {
      mutation.mutate(formData)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: 'primary.main' }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <FaCalendarAlt /> Ajouter un Planning de travail
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Autocomplete
              multiple
              options={doctors}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
              onChange={(e, value) => {
                const ids = value.map((doctor) => doctor.id)
                setFormData({ ...formData, doctorIds: ids })
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Docteurs"
                  placeholder="Sélectionner les docteurs"
                  margin="dense"
                  error={Boolean(errors.doctorIds)}
                  helperText={errors.doctorIds ? errors.doctorIds : ''}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <FaUserMd className={classe.iconStarter} />
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
            {/* Input date */}
            <TextField
              label="Ajouter une date"
              type="date"
              fullWidth
              margin="dense"
              error={Boolean(errors.dates)}
              helperText={
                errors.dates
                  ? errors.dates
                  : 'Ajouter la date au liste des dates une fois que vous avez selectionné un'
              }
              value={dateInput}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaCalendarAlt className={classe.iconStarter} />
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
              onChange={(e) => setDateInput(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button onClick={handleAddDate} sx={{ ml: 2, mt: 1 }} variant="outlined">
              Ajouter date
            </Button>

            {/* Liste des dates */}
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.dates.map((date) => (
                <Chip
                  key={date}
                  label={dayjs(date).format('DD MMM YYYY')}
                  onDelete={() => handleRemoveDate(date)}
                />
              ))}
            </Box>
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
AddWorkingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default AddWorkingModal
