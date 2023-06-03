import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import SessionStepper from './SessionStepper';
import CreateSessionButton from '../../Button/CreateSessionButton';
import ExerciseGrid from '../../Grid/ExerciseGrid';
import { getFavExercisesApi, getProtectedHeaders } from '../../../helpers/fnRequest';
import { useAuthContext } from '../../../Providers/AuthContext';
import PickDetailsModal from '../../Modal/PickDetailsModal';
import ConfirmActionModal from '../../Modal/Presentational/ConfirmActionModal';
import { useProtectedCall } from '../../../hooks/useProtectedCall';
import { Exercise } from '../../types/Exercise';
import { PageContainer, StepsContainer } from '../../PageContainer.css';
import { Dropdown } from '../../Form/Dropdown';
import { SessionForm } from '../../../Types';
import { SessionSchema } from '../../../helpers/fnForm';
import { Input } from '../../Form/Input';
import { FeaturePaths } from '../../../helpers/fnPaths';

const steps = ['Choose a name', 'Select exercises', 'Add notes and difficulty'];

// FIXME: types
const CreateSession: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [notes, setNotes] = useState('');
  // TODO
  // const [calories, setCalories] = useState('');
  // TODO: DIfficulty scale in UI
  const [difficulty, setDifficulty] = useState('Easy');
  const [exercise, setExercise] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  const { data } = useProtectedCall(getFavExercisesApi(user.userType), 'data');

  const methods = useForm<SessionForm>({
    resolver: yupResolver(SessionSchema),
    defaultValues: {
      name,
      notes,
      difficulty,
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSelection = (e: Exercise) => {
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

  const onSubmit = (formData: SessionForm) => {
    setName(formData.name);
    setNotes(formData.notes);
    setDifficulty(formData.difficulty);
  };

  const handleSave = () => {
    const body = {
      name,
      exercises: selectedExercises,
      difficulty,
      notes,
    };

    axios.post(`${process.env.TRAINER_API}/add-session`, body, {
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
    navigate(`../${FeaturePaths.SESSIONS}`);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Input name="name" type="text" labelText="Name" />
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
            <Input
              name="notes"
              type="text"
              labelText="Notes"
              multiline
              rows={4}
              fullWidth
            />
            <Dropdown options={['Easy', 'Moderate', 'High']} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <SessionStepper activeStep={activeStep} steps={steps} />
          <StepsContainer>
            {renderStepContent(activeStep)}
          </StepsContainer>
          <ConfirmActionModal open={!!successMessage} onClose={onSavedConfirmationClose} message={successMessage} title="Session saved" />
          <CreateSessionButton activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} handleSave={handleSave} />
        </form>
      </FormProvider>
    </PageContainer>
  );
};

export default CreateSession;
