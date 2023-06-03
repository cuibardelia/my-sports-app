import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
} from '@mui/material';
import { useState } from 'react';

// FIXME: types
interface IPickModal {
  exercise: any;
  handleExercise: (e, s, r) => void;
}

const PickDetailsModal: React.FC<IPickModal> = ({ exercise, handleExercise }) => {
  const [sets, setSets] = useState<number>(0);
  const [repetitions, setRepetitions] = useState<number>(0);

  if (!exercise) {
    return null;
  }

  const handleSave = () => {
    handleExercise(exercise, sets, repetitions);
    setSets(0);
    setRepetitions(0);
  };

  return (
    <Dialog open={!!exercise} onClose={handleSave}>
      <DialogTitle>{exercise.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Sets"
          type="number"
          value={sets}
          inputProps={{ min: '1' }}
          onChange={(e) => setSets(parseInt(e.target.value, 10))}
        />
        <TextField
          label="Repetitions"
          type="number"
          value={repetitions}
          inputProps={{ min: '1' }}
          onChange={(e) => setRepetitions(parseInt(e.target.value, 10))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PickDetailsModal;
