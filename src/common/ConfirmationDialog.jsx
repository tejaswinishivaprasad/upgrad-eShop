/*
This Component is add a confirmation box in the applicaiton.
this can be re used by any other component if there is a need to 
populate a confirmation dialog */

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onConfirm()} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
