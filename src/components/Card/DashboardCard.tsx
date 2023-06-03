import React from 'react';
import {
  Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Providers/AuthContext';
import { IClient } from '../types/User';

// TODO: most active at the gym
// TODO: biggest weight loss

const winners = [
  { name: 'John Doe', photoUrl: '/john-doe.jpg' },
  { name: 'Jane Smith', photoUrl: '/jane-smith.jpg' },
];

interface IPensiveMessage {
  kilos: number;
  isProgress: boolean;
  noResultsYet: boolean;
}

const KilosTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '3rem',
}));

interface IToGoMessage {
  kilos: number;
  noResultsYet?: boolean;
}

const MoreToGoMessage: React.FC<IToGoMessage> = ({ kilos, noResultsYet = false }) => (
  <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
    {'Only '}
    <KilosTypography variant="body1" display="inline">
      {kilos}
    </KilosTypography>
    {` ${noResultsYet ? '' : 'more'} kgs to go!`}
  </Typography>
);

const PensiveMessage: React.FC<IPensiveMessage> = ({ kilos, isProgress, noResultsYet }) => (isProgress ? (
  <MoreToGoMessage kilos={kilos} />
) : (
  <>
    <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
      {`You can ${noResultsYet ? '' : 'still'} make it! `}
    </Typography>
    <MoreToGoMessage kilos={kilos} noResultsYet={noResultsYet} />
  </>
));

interface IObjectiveCTA {
  objectiveAttained: boolean;
}

const ObjectiveCTA: React.FC<IObjectiveCTA> = ({ objectiveAttained }) => (
  <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
    {`Let\'s set your ${objectiveAttained ? 'new' : ''} `}
    <Link to="../settings">
      objectives
    </Link>
  </Typography>
);

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: '0 auto',
  padding: theme.spacing(2),
}));

const StyledCongratulations = styled(Typography)<{ isProgress: boolean }>(({ theme, isProgress }) => ({
  color: isProgress ? theme.palette.primary.dark : theme.palette.primary.main,
}));

const StyledList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(0),
}));

// TODO REFACTOR
const DashboardCard = () => {
  const { user } = useAuthContext();
  const client = user as IClient;
  const { goalWeight, currentWeight } = client;

  let initialWeight = 0;
  let latestWeight = 0;
  let previousWeight = 0;
  let weightChange = 0;
  let noResultsYet = true;
  let needsSettings = false;
  let latestObjective = null;
  let objectiveAttained = false;

  if (client.objectives?.length) {
    latestObjective = client.objectives.slice(-1);
    initialWeight = latestObjective[0].initialWeight;
  }

  if (client.weightStats?.length) {
    latestWeight = client.weightStats.slice(-1)[0].value || 0;
    previousWeight = client.weightStats.slice(-2)?.[0]?.value || initialWeight;
    noResultsYet = false;
  }

  weightChange = latestWeight - previousWeight;

  const appointmentCount = 4;
  const isLossObjective = initialWeight - goalWeight > 0;
  const isProgress = isLossObjective ? weightChange < 0 : weightChange > 0;
  // eslint-disable-next-line no-nested-ternary
  const statsIcon = isProgress ? '🎉' : noResultsYet ? '🚀' : '😓';
  const objective = isLossObjective ? 'loss' : 'gain';
  const remainingKgs = Math.abs(currentWeight - goalWeight);
  // eslint-disable-next-line no-nested-ternary
  const statsMessage = isProgress ? `Congratulations on your weight ${objective}!` : noResultsYet ? 'Welcome to your journey' : `Looks like you\'ve gone astray from your weight ${objective} objective`;

  if ((isLossObjective && currentWeight <= goalWeight) || (!isLossObjective && currentWeight >= goalWeight)) {
    objectiveAttained = true;
  }

  if (!currentWeight || !goalWeight) {
    needsSettings = true;
  }

  return (
    <StyledCard>
      <CardContent>
        <StyledCongratulations variant="h5" isProgress={isProgress}>
          {`${statsIcon} ${statsMessage}`}
          {
            needsSettings || objectiveAttained
              ? (
                <ObjectiveCTA objectiveAttained={objectiveAttained} />
              ) : (
                <PensiveMessage isProgress={isProgress} kilos={remainingKgs} noResultsYet={noResultsYet} />
              )
          }
        </StyledCongratulations>
        <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
          {'You have '}
          <Link to="../appointments">
            {appointmentCount}
            {'  PT sessions'}
          </Link>
          {' this week.'}
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginTop: 4 }}>
          This week&apos;s top achievers:
        </Typography>
        <StyledList sx={{ marginTop: 2 }}>
          {winners.map((winner, index) => (
            <StyledListItem key={`${index}-${winner}`}>
              <ListItemAvatar>
                <Avatar alt={winner.name} src={winner.photoUrl} />
              </ListItemAvatar>
              <ListItemText primary={winner.name} />
            </StyledListItem>
          ))}
        </StyledList>
      </CardContent>
    </StyledCard>
  );
};

export default DashboardCard;
