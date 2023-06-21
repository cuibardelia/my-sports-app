import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { PageContainer, StepsContainer } from '../../PageContainer.css';
import SessionStepper from './SessionStepper';
import CreateSessionButton from '../../Button/CreateSessionButton';
import { useAuthContext } from '../../../Providers/AuthContext';

import ClientsGrid from '../../Grid/ClientsGrid';
import { useProtectedCall } from '../../../hooks/useProtectedCall';
import { IClient } from '../../types/User';
import { SessionPlan, toggleIdInArray } from '../../../helpers/fnSession';
import { AppointmentTime } from '../../Form/AppointmentTime';
import { AppointmentForm } from '../../../Types';
import { AppointmentSchema } from '../../../helpers/fnForm';
import SessionsGrid from '../../Grid/SessionsGrid';
import { getProtectedHeaders } from '../../../helpers/fnRequest';
import ConfirmActionModal from '../../Modal/Presentational/ConfirmActionModal';
import { FeaturePaths } from '../../../helpers/fnPaths';

const steps = ['When?', 'What?', 'Who?'];

const CreateAppointment: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  // FIXME: default
  const [room, setRoom] = useState('Green Room');
  const [selectedClients, setSelectedClients] = useState([]);
  const [session, setSession] = useState('');

  const { data } = useProtectedCall(`${process.env.TRAINER_API}/get-clients`, 'clients');
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const methods = useForm<AppointmentForm>({
    resolver: yupResolver(AppointmentSchema),
    defaultValues: {
      startDate,
      endDate,
      room,
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    if (!selectedClients.length || !session) {
      // TODO: add modal
      return;
    }
    const body = {
      session,
      roomName: room,
      startDate,
      endDate,
      clients: selectedClients,
    };

    axios.post(`${process.env.TRAINER_API}/create-session-appointment`, body, {
      headers: getProtectedHeaders(token),
    })
      .then(() => {
        setSuccessMessage('Appointment successfully added.');
      })
      .catch((error) => {
        setSuccessMessage(error.response.data.error);
      });
  };

  const handleSelect = (client: IClient) => {
    setSelectedClients(toggleIdInArray(selectedClients, client._id));
  };

  const onCardClick = (s: SessionPlan) => {
    setSession(s._id);
  };

  const onSubmit = (formData: AppointmentForm) => {
    setStartDate(dayjs(formData.startDate));
    setEndDate(dayjs(formData.endDate));
    setRoom(formData.room);
  };

  const onSavedConfirmationClose = () => {
    setSuccessMessage('');
    navigate(`../${FeaturePaths.APPOINTMENTS}`);
  };
  // FIXME: check if time slot is alrady taken for that ROom
  // FIXME: multiple sesssion should not be possible
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AppointmentTime />
        );
      case 1:
        return (
          <SessionsGrid onCardClick={onCardClick} allowsPick />
        );
      case 2:
        return (
          <ClientsGrid clients={data} setSelectedClient={handleSelect} allowsMultiplePick />
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
          <ConfirmActionModal open={!!successMessage} onClose={onSavedConfirmationClose} message={successMessage} title="Appointment saved" />
          <CreateSessionButton
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handleSave={handleSave}
          />
        </form>
      </FormProvider>
    </PageContainer>
  );
};

export default CreateAppointment;
