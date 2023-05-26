import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

const steps = ['Choose a name', 'Select exercises', 'Add notes and difficulty'];

const SessionStepper: React.FC<{ activeStep: number }> = ({ activeStep }) => (
  <Stepper activeStep={activeStep}>
    {steps.map((s) => (
      <Step key={s}>
        <StepLabel>{s}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default SessionStepper;
