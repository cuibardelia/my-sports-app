import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';

interface INoData {
  message: string;
}

const NoData: React.FC<INoData> = ({ message = '' }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        Ooops!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        { message }
      </Typography>
    </CardContent>
  </Card>
);

export default NoData;
