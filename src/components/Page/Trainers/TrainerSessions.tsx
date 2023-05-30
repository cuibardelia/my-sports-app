import * as React from 'react';
import {
  Card, CardContent, Typography,
} from '@mui/material';
import { useState } from 'react';
import { Container } from '@mui/system';
import SessionExerciseModal from '../../Modal/SessionExerciseModal';
import SessionModal from '../../Modal/SessionModal';
import { useProtectedCall } from '../../../hooks/useProtectedCall';
import DefaultButton from '../../Button/DefaultButton';
import { PageContainer } from '../../PageContainer.css';
import NoData from '../../Empty/NoData';

const TrainerSessions: React.FC = () => {
  const [session, setSession] = useState(null);
  const [exercises, setExercises] = useState(null);
  const { data } = useProtectedCall(`${process.env.TRAINER_API}/get-sessions`, 'sessions');

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

  if (!data?.length) {
    return <NoData message="No sessions yet" buttonText="Create New Session" link="new-session" />;
  }

  return (
    <PageContainer>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          All your sessions
        </Typography>
        <div>
          {data?.map((s) => (
            <Card key={s._id} variant="outlined" onClick={() => onCardClick(s)}>
              <CardContent>
                <Typography variant="h5">{s.name}</Typography>
              </CardContent>
            </Card>
          ))}
          <SessionModal session={session} handleClose={handleDetailClose} handleExercises={handleExercises} />
          <SessionExerciseModal exercises={exercises} handleClose={handleExerciseClose} />
        </div>
        <DefaultButton
          link="new-session"
          text="Create New Session"
        />
      </Container>
    </PageContainer>
  );
};
export default TrainerSessions;
