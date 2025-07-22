import { Alert, Snackbar } from '@mui/material'
import PropTypes from 'prop-types'

const DoctorToast = ({
  openSnackbarAdd,
  handleCloseSnackbarAdd,
  openSnackbarAddError,
  handleCloseSnackbarAddError,
  openSnackbarDelete,
  handleCloseSnackbarDelete
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
          Docteur ajouter avec succès
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
      <Snackbar
        open={openSnackbarDelete}
        autoHideDuration={5000}
        onClose={handleCloseSnackbarDelete}
      >
        <Alert
          onClose={handleCloseSnackbarDelete}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Docteur suprimer avec succès
        </Alert>
      </Snackbar>
    </>
  )
}
DoctorToast.propTypes = {
  openSnackbarAdd: PropTypes.bool.isRequired,
  openSnackbarAddError: PropTypes.bool.isRequired,
  openSnackbarDelete: PropTypes.bool.isRequired,
  handleCloseSnackbarAdd: PropTypes.func.isRequired,
  handleCloseSnackbarAddError: PropTypes.func.isRequired,
  handleCloseSnackbarDelete: PropTypes.func.isRequired
}

export default DoctorToast
