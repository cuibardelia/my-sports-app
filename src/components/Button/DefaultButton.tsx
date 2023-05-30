import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface IButtons {
  text: string;
  link?: string;
  type?: 'submit';
}
const DefaultButton: React.FC<IButtons> = ({
  link, text, type,
}) => (
  <Button
    component={link ? Link : undefined}
    to={link || null}
    type={type}
    variant="contained"
    color="secondary"
    size="large"
    sx={{ mt: 4, mx: 'auto', display: 'block' }}
  >
    { text }
  </Button>
);

export default DefaultButton;
