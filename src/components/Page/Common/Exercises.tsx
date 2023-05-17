import * as React from 'react';
import { useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import PageContainer from '../../PageContainer.css';
import ExerciseGrid from '../../Grid/ExerciseGrid';
import { exerciseOptions, SelectedOption, useExercisesContext } from '../../../Providers/ExercisesContext';
import ExerciseModal from './ExerciseModal';
import { useAuthContext } from '../../../Providers/AuthContext';

// https://api-ninjas.com/api/exercises if this one is ok we could asses muscle -> png
// https://wger.de/api/v2/exerciseinfo/ same here!!

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
      <ButtonGroup variant="contained" aria-label="button group">
        {exerciseOptions.map((option) => (
          <Button
            key={option}
            onClick={() => handleClick(option)}
            sx={{
              backgroundColor: activeOption === option ? purple[300] : green[300],
              '&:hover': {
                backgroundColor: green[400],
              },
            }}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <ExerciseModal exercise={openExercise} />
      <ExerciseGrid items={items} />
    </PageContainer>
  );
};
export default Exercises;
