import * as React from 'react';
import { CardContainer, CardInner, Snap } from './ExerciseCard.css';

type CardExercisePropType = {
  name: string;
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExerciseCard: React.FC<CardExercisePropType> = ({ name = '', path = '' }) => (
  <CardContainer>
    <CardInner>
      <Snap path={path} />
    </CardInner>
  </CardContainer>

);

export default ExerciseCard;
