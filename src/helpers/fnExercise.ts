import { Exercise, ICommonUser, IUser } from '../Types';

export const isAmongFavorites = (exercise: Exercise, user: IUser): boolean => {
  if (!exercise) {
    return false;
  }
  const { id } = exercise;
  return (user as ICommonUser).favoriteExercises.some((oId) => id === oId);
};

export const getFavActionText = (isFavorite: boolean): string => (isFavorite ? 'Remove from Favorites' : 'Add to Favorites');
