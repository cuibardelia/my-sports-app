import React from 'react';
import styled from 'styled-components';
import { Card, Typography, CardContent } from '@mui/material';
import { ITrainer, IUser } from '../types/User';

const CardContainer = styled(Card)<{ isOwn?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px;
  margin: auto;
${(props) => props.isOwn
    && `max-width: 80%;
    flex-direction: column;`}
`;

const ProfilePicture = styled.img<{ isOwn?: boolean }>`
  width: ${(props) => (props.isOwn ? '300px' : '150px')};
  height: ${(props) => (props.isOwn ? '300px' : '150px')};
  margin-right: 16px;
  border-radius: 3%;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const InfoItem = styled.div`
  margin-bottom: 16px;
`;

const NoPictureCard = styled(Card)`
  width: 150px;
  height: 150px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBody = styled(Typography)`
  padding: 10px 0;
`;

const TrainerCard: React.FC<{ user: IUser, isOwn?: boolean }> = ({ user, isOwn = false }) => {
  const {
    picUrl, bio, specialties,
  } = user as ITrainer;

  return (
    <CardContainer isOwn={isOwn}>
      { picUrl ? (
        <ProfilePicture src={picUrl} alt="Profile Picture" isOwn={isOwn} />
      ) : (
        <NoPictureCard>
          <CardContent>
            <Typography variant="subtitle1">No Picture Yet</Typography>
          </CardContent>
        </NoPictureCard>
      )}
      <InfoContainer>
        <InfoItem>
          <Typography variant="h5">📝 Bio:</Typography>
          <StyledBody variant="body1">
            {bio}
          </StyledBody>
        </InfoItem>
        <InfoItem>
          <Typography variant="h5">💪 Specialties:</Typography>
          <StyledBody variant="body1">
            {specialties.join(', ') || 'None'}
          </StyledBody>
        </InfoItem>
      </InfoContainer>
    </CardContainer>
  );
};

export default TrainerCard;
