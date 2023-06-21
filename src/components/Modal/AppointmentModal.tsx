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
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import {
  getDate, getEquipment, getFullName, getHours,
} from '../../helpers/fnRequest';

interface IAppointmentModal {
  appointmentData: any;
  handleClose: () => void;
  handleExercises: (a: any) => void;
}

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: theme.palette.text.disabled,
  textAlign: 'center',
  // @ts-ignore
  background: `linear-gradient(45deg, ${theme.palette.secondary.light}, ${theme.palette.accent.secondary})`,
}));

export const PaddedTypography = styled(Typography)(() => ({
  padding: '15px 5px 5px 5px',
}));

const MidDialog = styled(DialogContent)(() => ({
  width: '450px',
}));

export const DialogText = styled(DialogContentText)({
  paddingLeft: '30px',
});

const AppointmentModal: React.FC<IAppointmentModal> = ({ handleClose, appointmentData, handleExercises }) => {
  if (!appointmentData) {
    return null;
  }

  const sDate = new Date(appointmentData.startDate);
  const eDate = new Date(appointmentData.endDate);
  const date = getDate(sDate);
  const interval = `${getHours(sDate)} -  ${getHours(eDate)}`;
  const clients = appointmentData.clients.map((c) => getFullName(c)).join(', ');
  const parsedDate = dayjs(date, 'DD/MM, HH:mm:ss');
  const formattedDate = parsedDate.locale('en').format('DD/MM, dddd');

  return (
    <Dialog open={!!appointmentData} onClose={handleClose}>
      <StyledDialogTitle>{appointmentData.session.name.toUpperCase()}</StyledDialogTitle>
      <MidDialog>
        <PaddedTypography variant="h5">📅 Date:</PaddedTypography>
        <DialogText>{formattedDate}</DialogText>
        <PaddedTypography variant="h5">⏰ Time:</PaddedTypography>
        <DialogText>{interval}</DialogText>
        <PaddedTypography variant="h5">📍 Room:</PaddedTypography>
        <DialogText>{appointmentData.roomName}</DialogText>
        <PaddedTypography variant="h5">⚽ Equipment:</PaddedTypography>
        <DialogText>{getEquipment(appointmentData.session.equipment)}</DialogText>
        <PaddedTypography variant="h5">✒️ Notes:</PaddedTypography>
        <DialogText>{appointmentData.session.notes || 'none'}</DialogText>
        <PaddedTypography variant="h5">👤 Clients:</PaddedTypography>
        <DialogText>{clients}</DialogText>
      </MidDialog>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
        <Button onClick={() => handleExercises(appointmentData.session.exercises)} variant="outlined" color="primary">
          See Exercises
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;
