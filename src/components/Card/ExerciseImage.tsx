import { styled } from '@mui/system';
import React from 'react';
import { Img } from 'react-image';
import { Exercise } from '../types/Exercise';

export const StyledImg = styled(Img)`
    width: 100%;
  height: 100%
`;

const generateRandom = (min: number, max: number): number => Math.floor(Math.random() * max) + min;

const ExerciseImage: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
  <StyledImg src={[exercise.gifUrl, `/assets/fallback/${generateRandom(1, 9)}.gif`]} alt={exercise.name} />
);

export default ExerciseImage;
