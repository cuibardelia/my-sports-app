import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import { useAuthContext } from '../../Providers/AuthContext';
import {
  DarkGradientCard, DefaultLink, KilosTypography, LightTypography,
} from './Dashboard.css';
import { IClient } from '../types/User';
import { getStats } from '../../helpers/fnStats';

interface IPensiveMessage {
  kilos: number;
  isProgress: boolean;
  noResultsYet: boolean;
}

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
  <Typography variant="body2" gutterBottom sx={{ margin: 2 }}>
    {`Let\'s set your ${objectiveAttained ? 'new' : ''} `}
    <DefaultLink to="../settings">
      objectives
    </DefaultLink>
  </Typography>
);

const CheeringMessage: React.FC = () => {
  const { user } = useAuthContext();
  const client = user as IClient;
  const { goalWeight, currentWeight } = client;

  const {
    initialWeight,
    latestWeight,
    previousWeight,
    weightChange,
    noResultsYet,
    latestObjective,
  } = getStats(client);

  let needsSettings = false;
  let objectiveAttained = false;

  const isLossObjective = initialWeight - goalWeight > 0;
  const isProgress = isLossObjective ? weightChange < 0 : weightChange > 0;
  // eslint-disable-next-line no-nested-ternary
  const statsIcon = isProgress ? '🎉' : noResultsYet ? '🚀' : '😓';
  const objective = isLossObjective ? 'loss' : 'gain';
  const remainingKgs = Math.abs(currentWeight - goalWeight);
  // eslint-disable-next-line no-nested-ternary
  const statsMessage = isProgress ? `Congratulations on your weight ${objective}!` : noResultsYet ? 'Welcome to your journey' : `Looks like you\'ve gone astray from your weight ${objective} objective`;

  // FIXME: LAST ONE HAS DATE ACHIEVED
  if ((isLossObjective && currentWeight <= goalWeight) || (!isLossObjective && currentWeight >= goalWeight)) {
    objectiveAttained = true;
  }

  if (!currentWeight || !goalWeight) {
    needsSettings = true;
  }

  return (
    <DarkGradientCard>
      <CardContent>
        <LightTypography variant="h5">
          {`${statsIcon} ${statsMessage}`}
          {
                      needsSettings || objectiveAttained
                        ? (
                          <ObjectiveCTA objectiveAttained={objectiveAttained} />
                        ) : (
                          <PensiveMessage isProgress={isProgress} kilos={remainingKgs} noResultsYet={noResultsYet} />
                        )
                  }
        </LightTypography>
      </CardContent>
    </DarkGradientCard>
  );
};

export default CheeringMessage;
