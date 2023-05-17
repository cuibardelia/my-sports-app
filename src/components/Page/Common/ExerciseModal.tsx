import * as React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Exercise } from '../../../Types';
import { useExercisesContext } from '../../../Providers/ExercisesContext';
import { getFavActionApi, getProtectedHeaders } from '../../../helpers/fnRequest';
import { useAuthContext } from '../../../Providers/AuthContext';
import { getFavActionText, isAmongFavorites } from '../../../helpers/fnExercise';

interface ModalProps {
  exercise: Exercise
}
const ExerciseModal: React.FC<ModalProps> = ({ exercise }) => {
  const { setModalDetail } = useExercisesContext();
  const { user, token, resetUser } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState<boolean>(isAmongFavorites(exercise, user));

  useEffect(() => {
    if (exercise && user) {
      setIsFavorite(isAmongFavorites(exercise, user));
    }
  }, [exercise, user]);

  const handleClose = () => {
    setModalDetail(null);
  };

  const handleFavoritesAction = () => {
    const body = isFavorite ? { id: exercise.id } : exercise;
    // TODO: custom hook
    axios.post(getFavActionApi(user.userType, isFavorite), body, {
      headers: getProtectedHeaders(token),
    })
      .then((response) => {
        resetUser(response.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionText = getFavActionText(isFavorite);
  // TODO: In a session / class we can list the equipment needed for one -> PICS
  // fixme: pagination ruins button handling

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
          <Button onClick={handleFavoritesAction} variant="outlined" color="primary">
            {actionText}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
export default ExerciseModal;
