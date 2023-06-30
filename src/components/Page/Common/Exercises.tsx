import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { PageContainer } from '../../PageContainer.css';
import ExerciseGrid from '../../Grid/ExerciseGrid';
import { exerciseOptions, SelectedOption, useExercisesContext } from '../../../Providers/ExercisesContext';
import FavExerciseModal from '../../Modal/FavExerciseModal';
import { useAuthContext } from '../../../Providers/AuthContext';
import TabNav from '../../Navigation/TabNav';

const getOptionIndex = (value: SelectedOption): number => Object.values(SelectedOption).indexOf(value);

const ExercisesContainer = styled(Box)`
 width: 80%;
`;

const Exercises: React.FC = () => {
  const {
    setSelectedOption, activeOption, items, openExercise,
  } = useExercisesContext();
  const { user } = useAuthContext();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleClick = (option) => {
    setSelectedOption(option);
    setTabIndex(getOptionIndex(option));
  };

  useEffect(() => {
    if (activeOption === SelectedOption.FAV) {
      setSelectedOption(SelectedOption.LOAD);
      setTimeout(() => {
        setSelectedOption(SelectedOption.FAV);
      }, 1000);
    }
  }, [user]);

  return (
    <PageContainer>
      <>
        <TabNav optionsList={exerciseOptions} tabIndex={tabIndex} handleClick={handleClick} activeOption={activeOption} />
        <FavExerciseModal exercise={openExercise} />
        <ExercisesContainer>
          <ExerciseGrid items={items} />
        </ExercisesContainer>
      </>
    </PageContainer>
  );
};
export default Exercises;
