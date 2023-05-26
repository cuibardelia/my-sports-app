import {
  Exercise, IClient, ICommonUser, ITrainer, IUser,
} from '../Types';

export const isAmongFavorites = (exercise: Exercise, user: IUser): boolean => {
  if (!exercise) {
    return false;
  }
  const { id } = exercise;
  return (user as ICommonUser).favoriteExercises.some((eId) => id === eId);
};

export const getFavActionText = (isFavorite: boolean): string => (isFavorite ? 'Remove from Favorites' : 'Add to Favorites');

export const isAmongPTList = (trainer: ITrainer, user: IUser): boolean => {
  if (!trainer) {
    return false;
  }
  const { _id } = trainer;
  return (user as IClient).favoriteTrainers.some((fId) => _id === fId);
};
