import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// Steps per date range
// https://dev.fitbit.com/build/reference/web-api/activity-timeseries/get-activity-timeseries-by-date-range/

const activeSteps = [
  {
    dateTime: '2018-12-26',
    value: '2504',
  },
  {
    dateTime: '2018-12-27',
    value: '3723',
  },
  {
    dateTime: '2018-12-28',
    value: '8304',
  },
  {
    dateTime: '2018-12-29',
    value: '7861',
  },
  {
    dateTime: '2018-12-30',
    value: '837',
  },
  {
    dateTime: '2018-12-31',
    value: '4103',
  },
  {
    dateTime: '2019-01-01',
    value: '1698',
  },
];

const StepsChart: React.FC = () =>
  // TODO: calculate domain based on max
  (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={600}
        height={600}
        data={activeSteps}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateTime" />
        <YAxis dataKey="value" domain={[20, 10000]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );

export default StepsChart;
