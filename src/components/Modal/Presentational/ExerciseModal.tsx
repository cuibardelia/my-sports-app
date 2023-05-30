import * as React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { Exercise } from '../../types/Exercise';

interface ModalProps {
  exercise: Exercise;
  handleClose: () => void;
  buttonText: string;
  handleButton: () => void
}
const ExerciseModal: React.FC<ModalProps> = ({
  exercise, handleClose, buttonText, handleButton,
}) => {
  console.log('here', exercise);
  if (!exercise) {
    return null;
  }
  return (
    <Dialog open={!!exercise} onClose={handleClose} maxWidth="md">
      <DialogTitle>{exercise.name}</DialogTitle>
      <DialogContent>
        <img src={exercise.gifUrl} alt={exercise.name} style={{ width: '100%', marginBottom: '16px' }} />
        <DialogContentText>
          <b>Equipment: </b>
          {exercise.equipment}
          <br />
          <b>Body part: </b>
          {exercise.bodyPart}
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
