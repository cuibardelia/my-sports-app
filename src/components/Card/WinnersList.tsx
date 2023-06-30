import * as React from 'react';
import {
  Avatar, ListItemAvatar, ListItemText,
} from '@mui/material';
import { SessionsTypography, StyledList, StyledListItem } from './Dashboard.css';
import { TopClient } from './DashboardCard';

interface IAchieversList {
  winners: TopClient[],
}

const WinnersList: React.FC<IAchieversList> = ({ winners }) => (
  <StyledList>
    {winners?.map((winner, index) => (
      <StyledListItem key={`${index}-${winner}`}>
        <ListItemAvatar>
          <Avatar alt={winner.client.username} src={winner.client.picUrl} />
        </ListItemAvatar>
        <ListItemText>
          {`${winner.client.username} with `}
          <SessionsTypography variant="body2" display="inline">
            {`${winner.appointmentCount} `}
          </SessionsTypography>
          sessions
        </ListItemText>
      </StyledListItem>
    ))}
  </StyledList>
);

export default WinnersList;
