import * as React from 'react';
import { useEffect } from 'react';
import {
  Tab, Tabs,
} from '@mui/material';
import { PageContainer } from '../../PageContainer.css';
import ExerciseGrid from '../../Grid/ExerciseGrid';
import { exerciseOptions, SelectedOption, useExercisesContext } from '../../../Providers/ExercisesContext';
import FavExerciseModal from '../../Modal/FavExerciseModal';
import { useAuthContext } from '../../../Providers/AuthContext';
import theme from '../../../theme';

const Exercises: React.FC = () => {
  const {
    setSelectedOption, activeOption, items, openExercise,
  } = useExercisesContext();
  const { user } = useAuthContext();

  // TODO: Token reset on client side
  const handleClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (activeOption === SelectedOption.FAV) {
      setSelectedOption(SelectedOption.LOAD);
      // TODO: this is obnoxious
      setTimeout(() => {
        setSelectedOption(SelectedOption.FAV);
      }, 1000);
    }
  }, [user]);

  return (
    <PageContainer>
      <>
        <Tabs value={activeOption} aria-label="exercises groups">
          {exerciseOptions.map((option) => (
            <Tab
              key={option}
              onClick={() => handleClick(option)}
              label={option}
              style={{
                color: activeOption === option ? theme.palette.primary.main : theme.palette.primary.dark,
              }}
            />
          ))}
        </Tabs>
        <FavExerciseModal exercise={openExercise} />
        <ExerciseGrid items={items} />
      </>
    </PageContainer>
  );
};
export default Exercises;
