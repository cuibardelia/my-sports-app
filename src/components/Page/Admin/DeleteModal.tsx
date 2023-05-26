import * as React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { getProtectedHeaders } from '../../../helpers/fnRequest';
import { useAdminContext } from '../../../Providers/AdminContext';
import { useAuthContext } from '../../../Providers/AuthContext';

const DeleteModal: React.FC = () => {
  const {
    userForDeletion, resetUsers, setUserForDeletion, setErrorMessage,
  } = useAdminContext();
  const { token } = useAuthContext();
  const [deletionStatus, setDeletionStatus] = useState('');

  const handleClose = () => {
    setUserForDeletion(null);
    setDeletionStatus('');
  };

  const handleDelete = () => {
    const body = {
      _id: userForDeletion.id,
      userType: userForDeletion.userType,
    };
    axios
      .delete(`${process.env.ADMIN_API}/delete-user`, {
        headers: getProtectedHeaders(token),
        data: body,
      })
      .then(() => {
        resetUsers();
        setDeletionStatus('User deleted successfully');
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <Dialog open={!!userForDeletion} onClose={handleClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        {deletionStatus ? (
          <DialogContentText>{deletionStatus}</DialogContentText>
        ) : (
          <DialogContentText>
            {`Are you sure you want to delete ${userForDeletion?.name}?`}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {!deletionStatus ? (
          <>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" variant="contained">
              Delete
            </Button>
          </>
        ) : (
          <Button onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
