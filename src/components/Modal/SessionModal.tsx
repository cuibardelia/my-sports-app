import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  getEquipment,
} from '../../helpers/fnRequest';
import { SessionPlan } from '../../helpers/fnSession';
import { DialogText, PaddedTypography } from './AppointmentModal';

const SmallDialog = styled(DialogContent)(({ theme }) => ({
  width: '380px',
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: theme.palette.text.disabled,
  textAlign: 'center',
  background: `linear-gradient(to right bottom, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light})`,
}));

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
      <StyledDialogTitle>{session.name}</StyledDialogTitle>
      <SmallDialog>
        <PaddedTypography variant="h5">⚽ Equipment:</PaddedTypography>
        <DialogText>{getEquipment(session.equipment)}</DialogText>
        <PaddedTypography variant="h5">🏃 Body parts:</PaddedTypography>
        <DialogText>{getEquipment(session.targets)}</DialogText>
        <PaddedTypography variant="h5">✒️  Notes:</PaddedTypography>
        <DialogText>{session.notes}</DialogText>
      </SmallDialog>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
        <Button onClick={() => handleExercises(session.exercises)} variant="outlined" color="primary">
          See Exercises
        </Button>
        {/* <Button onClick={handleDelete} color="secondary"> */}
        {/*  Delete */}
        {/* </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default SessionModal;
