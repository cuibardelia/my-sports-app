import React from 'react';
import {
  Chart, ArgumentAxis, ValueAxis, AreaSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@material-ui/core';
import { useTheme } from '@mui/material';
import {
  getProgressLabel, remapWeightStats,
} from '../../helpers/fnRequest';
import { useAuthContext } from '../../Providers/AuthContext';
import { IClient } from '../types/User';
import NoData from '../Empty/NoData';

const CustomAxisLabel = (props) =>
// eslint-disable-next-line react/destructuring-assignment
  <ArgumentAxis.Label {...props} text={getProgressLabel(props.text)} />;

export const WeightStats = () => {
  const { user } = useAuthContext();
  const client = user as IClient;

  // TODO: NO DATA
  const theme = useTheme();
  const areaColor = theme.palette.primary.main;
  const labelColor = theme.palette.secondary.main;

  // const data = [
  //   { date: '2022-01-01', weight: 70 },
  //   { date: '2022-01-02', weight: 69 },
  //   { date: '2022-01-03', weight: 68 },
  // ];

  if (!client.weightStats.length) {
    return <NoData message="No data yet" />;
  }

  return (
    <Paper>
      <Chart
        data={remapWeightStats(client.weightStats)}
      >
        <ArgumentAxis
          labelComponent={CustomAxisLabel}
        />
        <ValueAxis indentFromAxis={40} />
        <AreaSeries
          valueField="weight"
          argumentField="date"
          color={labelColor}
        />
      </Chart>
    </Paper>
  );
};

export default WeightStats;
