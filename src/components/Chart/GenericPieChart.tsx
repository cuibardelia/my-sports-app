import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { formatTargetPicName } from '../../helpers/fnRequest';

const StyledBox = styled(Box)({
  width: '100%',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, value, percent,
}) => {
  const theme = useTheme();

  const radius = (innerRadius + outerRadius) / 2;
  const imageSize = 22;
  const textOffset = 10;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const x = cx + radius * cos;
  const y = cy + radius * sin;

  return (
    <g transform={`translate(${x},${y})`}>
      <image
        href={`/assets/targets/${formatTargetPicName(value)}.png`}
        x={-imageSize / 2}
        y={-imageSize / 2}
        width={imageSize}
        height={imageSize}
      />
      <text
        x={0}
        y={imageSize / 2 + textOffset}
        fill={theme.palette.background.default}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {`${percent}%`}
      </text>
    </g>
  );
};

interface IChart {
  data: {
    value: number,
    name: string,
  }[],
  hasImageLabel?: boolean
}

const GenericPieChart: React.FC <IChart> = ({ data, hasImageLabel = false }) => {
  const theme = useTheme();

  const colors = !hasImageLabel ? [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.background.paper,
  ] : [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    // @ts-ignore
    theme.palette.secondary.lightFormat,
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
            label={hasImageLabel ? ({
              cx, cy, midAngle, innerRadius, outerRadius, name, value,
            }) => (
              <CustomLabel
                cx={cx}
                cy={cy}
                midAngle={midAngle}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                value={name}
                percent={value}
              />
            ) : true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {!hasImageLabel && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </StyledBox>
  );
};

export default GenericPieChart;
