import React from 'react';
import { Button } from '@mui/material';

interface IButtons {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSave: () => void;
}
const CreateSessionButton: React.FC<IButtons> = ({
  activeStep, handleBack, handleSave, handleNext,
}) => (
  <div>
    <Button disabled={activeStep === 0} onClick={handleBack}>
      Back
    </Button>
    {activeStep < 2 && (
    <Button type="submit" variant="contained" color="primary" onClick={handleNext}>
      Next
    </Button>
    )}
    {activeStep === 2 && (
    <Button variant="contained" color="primary" onClick={handleSave}>
      Save
    </Button>
    )}
  </div>
);

export default CreateSessionButton;
