import React from 'react';
import {
  Chart, ArgumentAxis, ValueAxis, LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { AreaSeries } from '@devexpress/dx-react-chart';
import {
  getProgressLabel,
} from '../../helpers/fnRequest';
import { IClient } from '../types/User';
import NoData from '../Empty/NoData';

const StyledLineSeries = styled(LineSeries)(({ theme }) => ({
  stroke: theme.palette.primary.main,
}));

const CustomAxisLabel = (props) => (
// eslint-disable-next-line react/destructuring-assignment
  <ArgumentAxis.Label {...props} text={getProgressLabel(props.text)} />);

export const WeightStats: React.FC<{ client: IClient }> = ({ client }) => {
  const theme = useTheme();
  const areaColor = theme.palette.primary.main;
  const labelColor = theme.palette.secondary.main;

  if (!client.weightStats.length) {
    return <NoData message="No data yet" />;
  }

  return (
    <Paper>
      <Chart
        data={client.weightStats}
      >
        <ArgumentAxis
          labelComponent={CustomAxisLabel}
          indentFromAxis={40}

        />
        <ValueAxis />
        <AreaSeries
          valueField="value"
          argumentField="date"
          color={labelColor}
        />
      </Chart>
    </Paper>

  );
};

export default WeightStats;
