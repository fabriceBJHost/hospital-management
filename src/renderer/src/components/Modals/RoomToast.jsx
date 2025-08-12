import { Alert, Snackbar } from '@mui/material'
import PropTypes from 'prop-types'

const RoomToast = ({
  openSnackbarAdd,
  handleCloseSnackbarAdd,
  openSnackbarAddError,
  handleCloseSnackbarAddError
}) => {
  return (
    <>
      <Snackbar open={openSnackbarAdd} autoHideDuration={5000} onClose={handleCloseSnackbarAdd}>
        <Alert
          onClose={handleCloseSnackbarAdd}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Chambre ajouter avec succès
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarAddError}
        autoHideDuration={5000}
        onClose={handleCloseSnackbarAddError}
      >
        <Alert
          onClose={handleCloseSnackbarAddError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Erreur, veuillez réesayer
        </Alert>
      </Snackbar>
    </>
  )
}
RoomToast.propTypes = {
  openSnackbarAdd: PropTypes.bool.isRequired,
  openSnackbarAddError: PropTypes.bool.isRequired,
  handleCloseSnackbarAdd: PropTypes.func.isRequired,
  handleCloseSnackbarAddError: PropTypes.func.isRequired
}

export default RoomToast
