import React from 'react';
import styled from 'styled-components';
import { Card, Typography, CardContent } from '@mui/material';
import { IClient, IUser } from '../../types/User';
import DefaultButton from '../../Button/DefaultButton';

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

const ClientCard: React.FC<{ user: IUser }> = ({ user }) => {
  const {
    picUrl, currentWeight, goalWeight, height,
  } = user as IClient;

  return (
    <CardContainer>
      { picUrl ? (
        <ProfilePicture src={picUrl} alt="Profile Picture" />
      ) : (
        <NoPictureCard>
          <CardContent>
            <Typography variant="subtitle1">No Picture Yet</Typography>
            <DefaultButton link="../settings" text="Add" />
          </CardContent>
        </NoPictureCard>
      )}
      <InfoContainer>
        <InfoItem>
          <Typography variant="subtitle1">Current Weight:</Typography>
          <Typography variant="body1">
            {`${currentWeight} kgs`}
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography variant="subtitle1">Goal Weight:</Typography>
          <Typography variant="body1">
            {`${goalWeight} kgs`}
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography variant="subtitle1">Height:</Typography>
          <Typography variant="body1">
            {`${height} cm`}
          </Typography>
        </InfoItem>
      </InfoContainer>
    </CardContainer>
  );
};

export default ClientCard;
