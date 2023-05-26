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
  getDate, getEquipment, getFullName, getHours,
} from '../../helpers/fnRequest';

interface IAppointmentModal {
  appointmentData: any;
  handleClose: () => void;
  handleExercises: (a: any) => void;
}
const AppointmentModal: React.FC<IAppointmentModal> = ({ handleClose, appointmentData, handleExercises }) => {
  if (!appointmentData) {
    return null;
  }

  const sDate = new Date(appointmentData.startDate);
  const eDate = new Date(appointmentData.endDate);
  const date = getDate(sDate);
  const interval = `${getHours(sDate)} -  ${getHours(eDate)}`;

  return (
    <Dialog open={!!appointmentData} onClose={handleClose}>
      <DialogTitle>{appointmentData.session.name}</DialogTitle>
      <DialogContent>
        <Typography variant="h5">Date:</Typography>
        <DialogContentText>{date}</DialogContentText>
        <Typography variant="h6">Time:</Typography>
        <DialogContentText>{interval}</DialogContentText>
        <Typography variant="h5">Room:</Typography>
        <DialogContentText>{appointmentData.roomName}</DialogContentText>
        <Typography variant="h5">Equipment:</Typography>
        <DialogContentText>{getEquipment(appointmentData.session.equipment)}</DialogContentText>
        <Typography variant="h5">Notes:</Typography>
        <DialogContentText>{appointmentData.session.notes}</DialogContentText>
        <Typography variant="h5">Clients:</Typography>
        <DialogContentText>{appointmentData.clients.map((c) => <span key={getFullName(c)}>{`${getFullName(c)}, `}</span>)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={() => handleExercises(appointmentData.session.exercises)} color="primary">
          See Exercises
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;
