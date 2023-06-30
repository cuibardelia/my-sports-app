import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useExercisesContext } from '../../Providers/ExercisesContext';
import { getFavActionApi, getProtectedHeaders } from '../../helpers/fnRequest';
import { useAuthContext } from '../../Providers/AuthContext';
import { getFavActionText, isAmongFavorites } from '../../helpers/fnFeatures';
import ExerciseModal from './Presentational/ExerciseModal';
import { Exercise } from '../types/Exercise';

interface ModalProps {
  exercise: Exercise;
}
const FavExerciseModal: React.FC<ModalProps> = ({ exercise }) => {
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

  if (!exercise) {
    return null;
  }

  return (
    <ExerciseModal exercise={exercise} handleClose={handleClose} buttonText={actionText} handleButton={handleFavoritesAction} />
  );
};
export default FavExerciseModal;
