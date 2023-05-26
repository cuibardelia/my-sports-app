import * as React from 'react';
import {
  Dialog, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { IClient } from '../../../Types';

interface TrainerModalProps {
  client: IClient;
  handleClose: () => void;
}

const UserModal: React.FC<TrainerModalProps> = ({ client, handleClose }) => {
  if (!client) {
    return null;
  }
  return (
    <Dialog open={!!client} onClose={handleClose} maxWidth="md">
      <DialogTitle>{`${client.firstName} ${client.lastName}`}</DialogTitle>
      <DialogContent>
        <img src={client.picUrl} alt={client.firstName} style={{ width: '100%', marginBottom: '16px' }} />
        <DialogContentText>
          <b>Current weight: </b>
          {client.currentWeight}
          <br />
          <b>Goal weight: </b>
          {client.goalWeight}
          <br />
          <b>Height: </b>
          {client.height}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default UserModal;
