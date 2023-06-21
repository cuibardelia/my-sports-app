import * as React from 'react';
import {
  Dialog, DialogContent, DialogContentText, DialogTitle, Box, IconButton, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/system';
import { IClient } from '../../types/User';
import { BuddyAvatar } from '../../Card/ClientCard';
import WeightStats from '../../Chart/WeightStats';
import ExerciseGrid from '../../Grid/ExerciseGrid';
import { Exercise } from '../../types/Exercise';
import { fetchFavExercises } from '../../../hooks/useProtectedCall';

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80%',
});

const StyledIconButton = styled(IconButton)({
  marginRight: '8px',
});

const StyledDialogContent = styled(DialogContent)({
  padding: '3rem 2rem',
});

const Subtitle = styled(Typography)({
  marginBottom: '2rem',
});

interface TrainerModalProps {
  client: IClient;
  handleClose: () => void;
}

const UserModal: React.FC<TrainerModalProps> = ({ client, handleClose }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const getFavExercises = async () => {
      if (client?.favoriteExercises) {
        const ids = client.favoriteExercises.map((e) => e.id);
        return fetchFavExercises(ids);
      }
      return null;
    };

    getFavExercises().then((res) => setExercises(res));
  }, [client]);

  console.log('here', client?.favoriteExercises);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleEnd = () => {
    setActiveStep(0);
    handleClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Subtitle>
              Information
            </Subtitle>
            <InfoContainer>
              <BuddyAvatar src={client.picUrl} alt={client.firstName} isClientModal>
                {client.firstName.charAt(0)}
              </BuddyAvatar>
              <DialogContentText>
                <b>Current weight: </b>
                {client.currentWeight}
                <br />
                <b>Goal weight: </b>
                {client.goalWeight}
                <br />
                <b>Height: </b>
                {client.height}
              </DialogContentText>
            </InfoContainer>
          </>
        );
      case 1:
        return (
          <>
            <Subtitle variant="subtitle1">Progress:</Subtitle>
            <WeightStats client={client} />
          </>
        );
      case 2:
        return (
          <>
            <Subtitle variant="subtitle1">Exercises to include:</Subtitle>
            <ExerciseGrid items={exercises} />
          </>
        );
      default:
        return null;
    }
  };

  if (!client) {
    return null;
  }

  const hasPrevious = activeStep > 0;
  const hasNext = activeStep < 2;

  return (
    <Dialog
      open={!!client}
      onClose={handleEnd}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: '80vw',
          height: '90vh',
        },
      }}
    >
      <DialogTitle>{`${client.firstName} ${client.lastName}`}</DialogTitle>
      <StyledDialogContent>
        {renderStepContent(activeStep)}
      </StyledDialogContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        {hasPrevious && (
          <StyledIconButton color="primary" onClick={handleBack}>
            <ArrowBack />
          </StyledIconButton>
        )}
        {hasNext && (
          <StyledIconButton
            color="primary"
            onClick={handleNext}
          >
            <ArrowForward />
          </StyledIconButton>
        )}
      </Box>
    </Dialog>
  );
};

export default UserModal;
