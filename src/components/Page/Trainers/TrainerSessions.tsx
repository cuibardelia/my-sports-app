import * as React from 'react';
import { Typography } from '@mui/material';
import { useState } from 'react';
import SessionExerciseModal from '../../Modal/SessionExerciseModal';
import SessionModal from '../../Modal/SessionModal';
import DefaultButton from '../../Button/DefaultButton';
import { PageContainer } from '../../PageContainer.css';
import SessionsGrid from '../../Grid/SessionsGrid';

const TrainerSessions: React.FC = () => {
  const [session, setSession] = useState(null);
  const [exercises, setExercises] = useState(null);

  const handleDetailClose = () => {
    setSession(null);
  };

  const handleExercises = (e) => {
    setExercises(e);
  };

  const handleExerciseClose = () => {
    setExercises(null);
  };

  const onCardClick = (s) => {
    setSession(s);
  };

  // TODO: delete session plans

  return (
    <PageContainer>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        All your sessions
      </Typography>
      <div>
        <SessionsGrid onCardClick={onCardClick} />
        <SessionModal session={session} handleClose={handleDetailClose} handleExercises={handleExercises} />
        <SessionExerciseModal exercises={exercises} handleClose={handleExerciseClose} />
      </div>
      <DefaultButton
        link="new-session"
        text="Create New Session"
      />
    </PageContainer>
  );
};
export default TrainerSessions;
