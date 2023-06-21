import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from '@mui/material';
import { Exercise } from '../types/Exercise';
import ExerciseImage from '../Card/ExerciseImage';
import { useExercisesContext } from '../../Providers/ExercisesContext';

const enhanceExercise = (exercises: Exercise[], chosenExercise: Exercise): Exercise => (exercises.length ? { ...chosenExercise, ...exercises?.find((e) => e?.id === chosenExercise?.id) } : null);

interface ModalProps {
  exercises: any[];
  handleClose: () => void;
}
const SessionExerciseModal: React.FC<ModalProps> = ({ exercises, handleClose }) => {
  const [currentExercise, setCurrentExercise] = useState<Exercise>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { favExercises } = useExercisesContext();

  useEffect(() => {
    setCurrentExercise(enhanceExercise(favExercises.current, exercises?.[0]));
    setCurrentPage(1);
  }, [exercises]);

  const handlePageChange = (event, page) => {
    setCurrentExercise(enhanceExercise(favExercises.current, exercises?.[page - 1]));
    setCurrentPage(page);
  };

  if (!currentExercise || !exercises?.length) {
    return null;
  }

  return (
    <Dialog open={!!currentExercise} onClose={handleClose} maxWidth="md">
      <DialogTitle>{currentExercise.name}</DialogTitle>
      <DialogContent>
        <Pagination
          count={exercises?.length}
          page={currentPage}
          onChange={handlePageChange}
        />
        <ExerciseImage exercise={currentExercise} />
        <DialogContentText>
          <b>Equipment: </b>
          {currentExercise.equipment}
          <br />
          <b>Body part: </b>
          {currentExercise.bodyPart}
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
export default SessionExerciseModal;
