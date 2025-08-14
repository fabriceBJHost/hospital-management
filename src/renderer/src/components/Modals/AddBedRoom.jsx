import {
  Autocomplete,
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
import { useState } from 'react'
import { FaDoorOpen } from 'react-icons/fa'
import classe from '../../assets/css/Users.module.css'
import { useQuery } from '@tanstack/react-query'
import { getAllRoom } from '../../function/Request'

const AddBedRoom = ({ open, handleClose, setOpenSnack, setOpenSnackError }) => {
  const [formData, setFormData] = useState({
    room_id: '',
    bed_number: '',
    status: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const { data: rooms = [] } = useQuery({
    queryKey: ['Rooms'],
    queryFn: getAllRoom
  })

  const handleSubmit = () => {
    console.log(formData)
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
          <Grid size={6}>
            <Autocomplete
              options={rooms}
              getOptionLabel={(option) => `${option.name} | ${option.type} | ${option.building}`}
              onChange={(e, value) => {
                const id = value.map((rooms) => rooms.id)
                setFormData({ ...formData, room_id: id })
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Docteurs"
                  placeholder="Sélectionner les chambres"
                  margin="dense"
                  // error={Boolean(errors.doctorIds)}
                  // helperText={errors.doctorIds ? errors.doctorIds : ''}
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

export default AddBedRoom
