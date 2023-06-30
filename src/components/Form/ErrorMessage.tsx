import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const ErrorContainer = styled('div')(() => ({
  width: '100%',
  maxWidth: '100%',
  position: 'absolute',
  bottom: '-16px',
  left: '10px',
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(0.5),
  whiteSpace: 'pre-wrap',
  fontSize: '10px',
  textAlign: 'center',
}));

interface IErrorMessage {
  message: any
}

export const ErrorMessage: React.FC<IErrorMessage> = ({ message }) => (
  <ErrorContainer>
    <ErrorText variant="body2">
      {message}
    </ErrorText>
  </ErrorContainer>
);
