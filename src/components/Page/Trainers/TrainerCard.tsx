import React from 'react';
import styled from 'styled-components';
import { Card, Typography, CardContent } from '@mui/material';
import { ITrainer, IUser } from '../../types/User';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
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

const TrainerCard: React.FC<{ user: IUser }> = ({ user }) => {
  const {
    picUrl, bio, formattedSpecialties,
  } = user as ITrainer;

  return (
    <CardContainer>
      { picUrl ? (
        <ProfilePicture src={picUrl} alt="Profile Picture" />
      ) : (
        <NoPictureCard>
          <CardContent>
            <Typography variant="subtitle1">No Picture Yet</Typography>
          </CardContent>
        </NoPictureCard>
      )}
      <InfoContainer>
        <InfoItem>
          <Typography variant="subtitle1">Bio:</Typography>
          <Typography variant="body1">
            {bio}
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography variant="subtitle1">Specialties:</Typography>
          <Typography variant="body1">
            {formattedSpecialties}
          </Typography>
        </InfoItem>
      </InfoContainer>
    </CardContainer>
  );
};

export default TrainerCard;
