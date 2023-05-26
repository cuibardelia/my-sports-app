import React, { useState } from 'react';
import {
  TextField, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SessionStepper from './SessionStepper';
import SessionButton from './SessionButton';
import ExerciseGrid from '../../Grid/ExerciseGrid';
import { getFavExercisesApi, getProtectedHeaders } from '../../../helpers/fnRequest';
import { useAuthContext } from '../../../Providers/AuthContext';
import { Exercise } from '../../../Types';
import PickDetailsModal from '../../Modal/PickDetailsModal';
import ConfirmActionModal from '../../Modal/Presentational/ConfirmActionModal';
import { useProtectedCall } from '../../../hooks/useProtectedCall';

// FIXME: types
const CreateSession: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [notes, setNotes] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [exercise, setExercise] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  const { data } = useProtectedCall(getFavExercisesApi(user.userType), 'data');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSelection = (e: Exercise) => {
    // setSelectedIds((prevSelected) => [...prevSelected, e]);
    setExercise(e);
  };

  const addExercise = (e: Exercise, sets: number, repetitions: number) => {
    setExercise(null);
    const ex = {
      _id: e._id,
      sets,
      repetitions,
    };
    setSelectedExercises((prevSelected) => [...prevSelected, ex]);
  };

  const handleSave = () => {
    const body = {
      name,
      exercises: selectedExercises,
      difficulty,
      notes,
    };

    axios.post('http://localhost:5000/api/trainer/add-session', body, {
      headers: getProtectedHeaders(token),
    })
      .then((response) => {
        setSuccessMessage('Session successfully saved');
      })
      .catch((error) => {
        console.log(error);
      });
    setName('');
    setSelectedExercises([]);
    setNotes('');
    setDifficulty('');
    setActiveStep(0);
  };

  const onSavedConfirmationClose = () => {
    setSuccessMessage('');
    navigate('/trainer/sessions');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        );
      case 1:
        return (
          <>
            <ExerciseGrid allowsMultiplePick setSelectedExercise={handleSelection} items={data} />
            <PickDetailsModal exercise={exercise} handleExercise={addExercise} />
          </>
        );
      case 2:
        return (
          <div>
            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                label="Difficulty"
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <SessionStepper activeStep={activeStep} />
      <Container
        maxWidth="sm"
        style={{
          height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
      >
        {renderStepContent(activeStep)}
      </Container>
      <ConfirmActionModal open={!!successMessage} onClose={onSavedConfirmationClose} message={successMessage} />
      <SessionButton activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} handleSave={handleSave} />
    </div>
  );
};

export default CreateSession;
