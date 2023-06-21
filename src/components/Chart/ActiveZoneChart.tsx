import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { ChartArea } from './StepsChart';

// AZM by date - graph with multiple values
// https://dev.fitbit.com/build/reference/web-api/active-zone-minutes-timeseries/get-azm-timeseries-by-date/

const activeMinutes = [
  {
    dateTime: '2022-05-01',
    activeZoneMinutes: 21,
    fatBurnActiveZoneMinutes: 5,
    cardioActiveZoneMinutes: 12,
    peakActiveZoneMinutes: 4,
  },
  {
    dateTime: '2022-05-02',
    activeZoneMinutes: 8,
    fatBurnActiveZoneMinutes: 1,
    cardioActiveZoneMinutes: 4,
    peakActiveZoneMinutes: 3,
  },
  {
    dateTime: '2022-05-03',
    activeZoneMinutes: 44,
    fatBurnActiveZoneMinutes: 10,
    cardioActiveZoneMinutes: 29,
    peakActiveZoneMinutes: 5,
  },
];

const ActiveZoneChart: React.FC = () =>
// TODO: calculate domain based on max
  (
    <ChartArea>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={activeMinutes}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateTime" />
          <YAxis domain={[0, 60]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="fatBurnActiveZoneMinutes" stackId="a" fill="#8884d8" />
          <Bar dataKey="cardioActiveZoneMinutes" stackId="a" fill="#82ca9d" />
          <Bar dataKey="peakActiveZoneMinutes" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </ChartArea>
  );

export default ActiveZoneChart;
