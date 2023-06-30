import * as React from 'react';
import {
  Box, CardContent, Typography,
} from '@mui/material';
import { useAuthContext } from '../../Providers/AuthContext';
import {
  DarkGradientCard,
  DefaultLink, KilosTypography, LightTypography, StyledLinearProgress,
} from './Dashboard.css';
import { IClient } from '../types/User';
import { getProgress, getStats, getStatsMessage } from '../../helpers/fnStats';

interface IPensiveMessage {
  kilos: number;
  isProgress: boolean;
  progress: number;
  noResultsYet: boolean;
}

interface IToGoMessage {
  kilos: number;
  progress?: number;
  noResultsYet?: boolean;
}

const MoreToGoMessage: React.FC<IToGoMessage> = ({ kilos, noResultsYet = false, progress = 0 }) => (
  <Box>
    <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
      {'Only '}
      <KilosTypography variant="body1" display="inline">
        {kilos}
      </KilosTypography>
      {` ${noResultsYet ? '' : 'more'} kgs to go!`}
    </Typography>
    { !!progress && <StyledLinearProgress variant="determinate" color="secondary" value={progress} /> }
  </Box>
);

const PensiveMessage: React.FC<IPensiveMessage> = ({
  kilos, isProgress, noResultsYet, progress,
}) => (isProgress ? (
  <MoreToGoMessage kilos={kilos} progress={progress} />
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
    weightChange,
    noResultsYet,
    initialWeight,
    isLossObjective,
  } = getStats(client);

  let needsSettings = false;
  let objectiveAttained = false;

  const isProgress = isLossObjective ? weightChange <= 0 : weightChange >= 0;
  // eslint-disable-next-line no-nested-ternary
  const statsIcon = isProgress ? '🎉' : noResultsYet ? '🚀' : '😓';
  const remainingKgs = Math.abs(currentWeight - goalWeight);
  const progress = getProgress(remainingKgs, initialWeight, goalWeight);
  const statsMessage = getStatsMessage(isProgress, isLossObjective, noResultsYet);

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
                          <PensiveMessage isProgress={isProgress} kilos={remainingKgs} progress={progress} noResultsYet={noResultsYet} />
                        )
                  }
        </LightTypography>
      </CardContent>
    </DarkGradientCard>
  );
};

export default CheeringMessage;
