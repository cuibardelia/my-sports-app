import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import {
  StyledCard,
} from './ExerciseCard.css';
import { useExercisesContext } from '../../Providers/ExercisesContext';
import { useAuthContext } from '../../Providers/AuthContext';
import { isAmongFavorites } from '../../helpers/fnFeatures';
import { Exercise } from '../types/Exercise';
import ExerciseImage, { StyledImg } from '../Card/ExerciseImage';

type CardExercisePropType = {
  e: any;
  name: string;
  allowsPick?: boolean;
  setSelectedExercise?: (e: Exercise) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExerciseCard: React.FC<CardExercisePropType> = ({
  e, allowsPick = false, setSelectedExercise,
}) => {
  const { setSelectedOption, setModalDetail } = useExercisesContext();
  const [isPicked, setIsPicked] = useState<boolean>(false);
  const isCategory = e?.type === 'category';
  const { user } = useAuthContext();

  const handleClick = () => {
    if (isCategory) {
      setSelectedOption(e.name);
    } else {
      setModalDetail(e);
    }
  };

  const handlePick = () => {
    setSelectedExercise(e);
    setIsPicked((prev) => !prev);
  };

  const hasFavoriteIcon = !(isCategory || allowsPick);
  const isFavorite = hasFavoriteIcon && isAmongFavorites(e, user);

  return (
    <StyledCard onClick={handleClick}>
      {
        isCategory ? (<StyledImg src={e.url} alt={e.name} />) : (<ExerciseImage exercise={e} />)
      }
      { hasFavoriteIcon && (
      <IconButton>
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      )}
      {allowsPick && (
      <IconButton onClick={handlePick}>
        <Radio checked={isPicked} color="primary" />
      </IconButton>
      )}
    </StyledCard>
  );
};

export default ExerciseCard;
