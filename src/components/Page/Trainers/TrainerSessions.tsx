import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import SessionExerciseModal from '../../Modal/SessionExerciseModal';
import SessionModal from '../../Modal/SessionModal';
import { PageContainer } from '../../PageContainer.css';
import SessionsGrid from '../../Grid/SessionsGrid';
import { NoTabsContentContainer } from '../../Appointments/NextAppointments';
import { LightCard } from '../../Card/Dashboard.css';

const StyledDefaultButton = styled(Button)`
  height: 57px;
  margin-top: 9px;
`;

const SessionsCard = styled(LightCard)`
`;

const CenteredContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

const TrainerSessions: React.FC = () => {
  const [session, setSession] = useState(null);
  const [exercises, setExercises] = useState(null);

  const navigate = useNavigate();

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

  const onNewClick = () => {
    navigate('new-session');
  };

  return (
    <PageContainer>
      <NoTabsContentContainer>
        <SessionsCard>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            All your sessions
          </Typography>
          <CenteredContainer>
            <StyledDefaultButton variant="outlined" color="secondary" onClick={onNewClick}>
              Add new
            </StyledDefaultButton>
          </CenteredContainer>
          <div>
            <SessionsGrid onCardClick={onCardClick} />
            <SessionModal session={session} handleClose={handleDetailClose} handleExercises={handleExercises} />
            <SessionExerciseModal exercises={exercises} handleClose={handleExerciseClose} />
          </div>
        </SessionsCard>
      </NoTabsContentContainer>
    </PageContainer>
  );
};
export default TrainerSessions;
