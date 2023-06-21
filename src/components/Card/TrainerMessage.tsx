import * as React from 'react';
import { CardContent } from '@mui/material';
import {
  DarkGradientCard, LightTypography,
} from './Dashboard.css';

const TrainerMessage: React.FC = () => (
  <DarkGradientCard>
    <CardContent>
      <LightTypography variant="h6">
        Your dedication and expertise are making a positive impact on your clients&apos; fitness journeys. Keep up the fantastic work!
      </LightTypography>
    </CardContent>
  </DarkGradientCard>
);

export default TrainerMessage;
