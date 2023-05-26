import * as React from 'react';
import {
  Grid, Avatar, Typography, ButtonGroup, Button,
} from '@mui/material';
import { deepPurple, green, purple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import PageContainer from '../../PageContainer.css';
import {
  buddyAPIMapping,
} from '../../../helpers/fnRequest';
import { ITrainer } from '../../../Types';
import TrainerModal from './TrainerModal';
import { useProtectedCallback } from '../../../hooks/useProtectedCall';

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

const Buddies: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>('All');
  const [items, setItems] = useState<ITrainer[]>([]);
  const [selectedUser, setSelectedUser] = useState<ITrainer>(null);

  const handleMenuClick = (option) => {
    setActiveOption(option);
  };

  const handleItemClick = (item) => {
    setSelectedUser(item);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  const fetchData = () => {
    const callAPI = useProtectedCallback(buddyAPIMapping[activeOption], 'users', setItems);
    callAPI();
  };

  useEffect(() => {
    fetchData();
  }, [activeOption]);

  // if (!items) {
  //   return <div>loading</div>;
  // }
  // TODO: pagination

  return (
    <PageContainer>
      <ButtonGroup variant="contained" aria-label="button group">
        {['All', 'My Personal Trainers'].map((option) => (
          <Button
            key={option}
            onClick={() => handleMenuClick(option)}
            sx={{
              backgroundColor: activeOption === option ? purple[300] : green[300],
              '&:hover': {
                backgroundColor: green[400],
              },
            }}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <Grid container spacing={2} sx={{ margin: '2rem' }}>
        {items?.map((buddy) => (
          <Grid item xs={6} sm={4} md={3} key={buddy.email} onClick={() => handleItemClick(buddy)}>
            <BuddyAvatar src={buddy.picUrl} alt={buddy.firstName}>
              {buddy.firstName.charAt(0)}
            </BuddyAvatar>
            <Typography variant="subtitle1" align="center">{`${buddy.firstName} ${buddy.lastName}`}</Typography>
          </Grid>
        ))}
      </Grid>
      <TrainerModal trainer={selectedUser} handleClose={handleModalClose} />
    </PageContainer>
  );
};

export default Buddies;
