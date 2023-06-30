import * as React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { Exercise } from '../../types/Exercise';
import ExerciseImage from '../../Card/ExerciseImage';

interface ModalProps {
  exercise: Exercise;
  handleClose: () => void;
  buttonText: string;
  handleButton: () => void
}
const ExerciseModal: React.FC<ModalProps> = ({
  exercise, handleClose, buttonText, handleButton,
}) => {
  if (!exercise) {
    return null;
  }
  return (
    <Dialog open={!!exercise} onClose={handleClose} maxWidth="md">
      <DialogTitle>{exercise.name}</DialogTitle>
      <DialogContent>
        <ExerciseImage exercise={exercise} />
        <DialogContentText>
          <b>Equipment: </b>
          {exercise.equipment}
          <br />
          <b>Body part: </b>
          {exercise.target}
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleButton} variant="outlined" color="primary">
            {buttonText}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
export default ExerciseModal;
