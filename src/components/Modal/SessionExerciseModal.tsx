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

interface ModalProps {
  exercises: any[];
  handleClose: () => void;
}
const SessionExerciseModal: React.FC<ModalProps> = ({ exercises, handleClose }) => {
  const [currentExercise, setCurrentExercise] = useState<Exercise>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentExercise(exercises?.[0]?._id);
    setCurrentPage(1);
  }, [exercises]);

  const handlePageChange = (event, page) => {
    setCurrentExercise(exercises?.[page - 1]?._id);
    setCurrentPage(page);
  };

  if (!currentExercise) {
    return null;
  }

  return (
    <Dialog open={!!currentExercise} onClose={handleClose} maxWidth="md">
      <DialogTitle>{currentExercise.name}</DialogTitle>
      <DialogContent>
        <img src={currentExercise.gifUrl} alt={currentExercise.name} style={{ width: '100%', marginBottom: '16px' }} />
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
        <Pagination
          count={exercises?.length}
          page={currentPage}
          onChange={handlePageChange}
        />
      </DialogContent>
    </Dialog>
  );
};
export default SessionExerciseModal;
