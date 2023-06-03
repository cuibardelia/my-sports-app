import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const ErrorContainer = styled('div')(() => ({
  width: '100%',
  maxWidth: '100%',
  position: 'absolute',
  bottom: '-11px',
  left: '10px',
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(0.5),
  whiteSpace: 'pre-wrap',
}));

interface IErrorMessage {
  message: any // fixme
}

export const ErrorMessage: React.FC<IErrorMessage> = ({ message }) => (
  <ErrorContainer>
    <ErrorText variant="body2">
      {message}
    </ErrorText>
  </ErrorContainer>
);
