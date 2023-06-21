import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  width: '100%',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const GenericPieChart = ({ data }) => {
  // FIXME:
  console.log('heree', data);

  const theme = useTheme();

  const colors = [
    theme.palette.primary.main,
    // @ts-ignore
    theme.palette.secondary.lightFormat,
    theme.palette.background.paper,
  ];

  return (
    <StyledBox>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </StyledBox>
  );
};

export default GenericPieChart;
