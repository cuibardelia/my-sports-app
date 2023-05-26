import * as React from 'react';
import {
  Button, Card, CardContent, Container, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PageContainer from '../../PageContainer.css';
import SessionExerciseModal from '../../Modal/SessionExerciseModal';
import SessionModal from '../../Modal/SessionModal';
import { useProtectedCall } from '../../../hooks/useProtectedCall';
import NoData from '../../NotFound/NoData';

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
    return <NoData message="No sessions yet" />;
  }

  return (
    <PageContainer>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          All your sessions
        </Typography>
        <div>
          {/* Replace the following code with the logic to map and render the session cards */}
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
        <Button
          component={Link}
          to="new-session"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4, mx: 'auto', display: 'block' }}
        >
          Create New Session
        </Button>
      </Container>
    </PageContainer>
  );
};
export default TrainerSessions;
