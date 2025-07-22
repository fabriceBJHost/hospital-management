import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import { IoWarningOutline } from 'react-icons/io5'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDoctor } from '../../function/Request'

const DeleteUsersModal = ({ open, handleClose, setOpenSnackDelete, id }) => {
  const queryclient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteDoctor,
    onSuccess: () => {
      setOpenSnackDelete(true)
      handleClose(true)
      queryclient.invalidateQueries({ queryKey: ['Doctors'] })
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const hancleClick = () => {
    mutation.mutate({ id })
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ color: 'warning.main' }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <IoWarningOutline /> Attention !
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Voulez vous supprimer ce Docteur ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="warning" onClick={hancleClick}>
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  )
}
DeleteUsersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setOpenSnackDelete: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
}

export default DeleteUsersModal
