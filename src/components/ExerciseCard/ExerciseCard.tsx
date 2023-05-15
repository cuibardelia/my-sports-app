import * as React from 'react';
import {
  Snap, StyledCard,
} from './ExerciseCard.css';

type CardExercisePropType = {
  // FIXME: type
  e: any;
  name: string;
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExerciseCard: React.FC<CardExercisePropType> = ({ e, name = '', path }) => {
  console.log('CHECK++', e);

  return (
    <StyledCard>
      <Snap src={path} />
    </StyledCard>
  );
};

export default ExerciseCard;
