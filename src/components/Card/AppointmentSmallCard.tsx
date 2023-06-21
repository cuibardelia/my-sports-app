import React from 'react';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';

const Card = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: '17px 9px 12px 9px',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  margin: '10px 0',
  textAlign: 'center',
}));

const TopTag = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '20%',
  // @ts-ignore
  background: `linear-gradient(45deg, ${theme.palette.secondary.light}, ${theme.palette.accent.secondary})`,
}));

const AppointmentSmallCard: React.FC<{ name: string }> = ({ name }) => (
  <Card>
    <TopTag />
    {name}
  </Card>
);

export default AppointmentSmallCard;
