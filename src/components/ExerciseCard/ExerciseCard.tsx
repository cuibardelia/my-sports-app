import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Snap, StyledCard,
} from './ExerciseCard.css';
import { useExercisesContext } from '../../Providers/ExercisesContext';
import { useAuthContext } from '../../Providers/AuthContext';
import { isAmongFavorites } from '../../helpers/fnExercise';

type CardExercisePropType = {
  // FIXME: type
  e: any;
  name: string;
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExerciseCard: React.FC<CardExercisePropType> = ({ e, path }) => {
  const { setSelectedOption, setModalDetail } = useExercisesContext();
  const isCategory = e?.type === 'category';
  const { user } = useAuthContext();

  const handleClick = () => {
    if (isCategory) {
      setSelectedOption(e.name);
    } else {
      setModalDetail(e);
    }
  };

  const isFavorite = !isCategory && isAmongFavorites(e, user);

  // TODO: change color
  return (
    <StyledCard onClick={handleClick}>
      <Snap src={path} />
      { !isCategory && (
      <IconButton>
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      )}
    </StyledCard>
  );
};

export default ExerciseCard;
