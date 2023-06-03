import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

const SessionStepper: React.FC<{ activeStep: number, steps: string[] }> = ({ activeStep, steps }) => (
  <Stepper activeStep={activeStep}>
    {steps.map((s) => (
      <Step key={s}>
        <StepLabel>{s}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default SessionStepper;
