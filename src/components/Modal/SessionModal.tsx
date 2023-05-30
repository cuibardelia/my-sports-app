import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import {
  getEquipment,
} from '../../helpers/fnRequest';
import { SessionPlan } from '../../helpers/fnSession';

interface ISessionModal {
  session: SessionPlan;
  handleClose: () => void;
  handleExercises: (a: string[]) => void;
}
const SessionModal: React.FC<ISessionModal> = ({ handleClose, session, handleExercises }) => {
  if (!session) {
    return null;
  }

  return (
    <Dialog open={!!session} onClose={handleClose}>
      <DialogTitle>{session.name}</DialogTitle>
      <DialogContent>
        <Typography variant="h5">Equipment:</Typography>
        <DialogContentText>{getEquipment(session.equipment)}</DialogContentText>
        <Typography variant="h5">Notes:</Typography>
        <DialogContentText>{session.notes}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={() => handleExercises(session.exercises)} color="primary">
          See Exercises
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionModal;
