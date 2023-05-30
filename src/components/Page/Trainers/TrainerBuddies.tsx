import * as React from 'react';
import {
  Grid, Avatar, Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { deepPurple, green } from '@mui/material/colors';
import { useState } from 'react';
import UserModal from './UserModal';
import { useProtectedCall } from '../../../hooks/useProtectedCall';
import { IClient } from '../../types/User';
import { PageContainer } from '../../PageContainer.css';
import NoData from '../../Empty/NoData';

const BuddyAvatar = styled(Avatar)(() => ({
  width: '100%',
  height: 'auto',
  aspectRatio: '1/1',
  backgroundColor: green[300],
  color: deepPurple[300],
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 0,
}));

const TrainerBuddies: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<IClient>(null);
  const { data } = useProtectedCall(`${process.env.TRAINER_API}/get-clients`, 'clients');

  const handleItemClick = (item) => {
    setSelectedUser(item);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  if (!data?.length) {
    return <NoData message="No clients yet" />;
  }

  // TODO: pagination
  return (
    <PageContainer>
      <Grid container spacing={2} sx={{ margin: '2rem' }}>
        {data?.map((buddy) => (
          <Grid item xs={6} sm={4} md={3} key={buddy.email} onClick={() => handleItemClick(buddy)}>
            <BuddyAvatar src={buddy.picUrl} alt={buddy.firstName}>
              {buddy.firstName.charAt(0)}
            </BuddyAvatar>
            <Typography variant="subtitle1" align="center">{`${buddy.firstName} ${buddy.lastName}`}</Typography>
          </Grid>
        ))}
      </Grid>
      <UserModal client={selectedUser} handleClose={handleModalClose} />
    </PageContainer>
  );
};

export default TrainerBuddies;
