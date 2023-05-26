import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@mui/material';

interface IActionConfirmedModal {
  open: boolean;
  onClose: () => void;
  message: string;
}

const ConfirmActionModal: React.FC<IActionConfirmedModal> = ({ open, onClose, message }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Settings Updated</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
export default ConfirmActionModal;
