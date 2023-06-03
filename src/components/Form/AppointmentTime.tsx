import * as React from 'react';
import { Grid } from '@mui/material';
import { DateTimeInput } from './DateTimeField';
import { Dropdown } from './Dropdown';

const roomOptions = ['Green Room', 'Yellow Room', 'Blue Room'];

export const AppointmentTime: React.FC = () => (
  <Grid container spacing={2} direction="column" alignItems="center">
    <Grid item>
      <DateTimeInput name="startDate" label="Start Time" />
    </Grid>
    <Grid item>
      <DateTimeInput name="endDate" label="End Time" />
    </Grid>
    <Grid item>
      <Dropdown options={roomOptions} />
    </Grid>
  </Grid>
);
