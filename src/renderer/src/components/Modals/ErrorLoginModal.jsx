import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorLoginModal = ({ open, close }) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FaExclamationTriangle color="red" /> Erreur de Connexion
      </DialogTitle>
      <DialogContent dividers>
        <Typography id="error-dialog-description">
          Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" variant="text">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorLoginModal;
