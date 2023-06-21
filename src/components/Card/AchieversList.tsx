import * as React from 'react';
import {
  Avatar, ListItemAvatar, ListItemText, Typography,
} from '@mui/material';
import { StyledList, StyledListItem } from './Dashboard.css';

interface IAchieversList {
  winners: {
    username,
    picUrl,
    dateAchieved,
    weightStatus,
  }[],
}

const AchieversList: React.FC<IAchieversList> = ({ winners }) => (
  <StyledList sx={{ padding: 1 }}>
    {winners?.map((achiever, index) => (
      <StyledListItem key={`${index}-${achiever.username}`}>
        <ListItemAvatar>
          <Avatar alt={achiever.username} src={achiever.picUrl} />
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
            {achiever.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            {`${achiever.weightStatus} on ${new Date(achiever.dateAchieved).toDateString()}`}
          </Typography>
        </ListItemText>
      </StyledListItem>
    ))}
  </StyledList>
);

export default AchieversList;
