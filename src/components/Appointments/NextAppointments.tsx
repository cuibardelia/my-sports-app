import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/system';
import { Typography, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from '../Modal/AppointmentModal';
import SessionExerciseModal from '../Modal/SessionExerciseModal';
import { Appointment } from '../../helpers/fnSession';
import { useProtectedCall } from '../../hooks/useProtectedCall';
import { Exercise } from '../types/Exercise';
import NoData from '../Empty/NoData';
import { PageContainer } from '../PageContainer.css';
import { FeaturePaths } from '../../helpers/fnPaths';
import { useAuthContext } from '../../Providers/AuthContext';
import { UserType } from '../types/User';
import Calendar from '../Calendar/Calendar';
import { DateRangeForm } from '../../Types';
import { StartDateSchema } from '../../helpers/fnForm';
import { DateInput } from '../Form/DateField';
import { useExercisesContext } from '../../Providers/ExercisesContext';

const WeekTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 16px;
`;

export const NoTabsContentContainer = styled(Box)`
  width: 90%;
  margin-top: 4rem;
`;

const StyledDefaultButton = styled(Button)`
  height: 57px;
  margin-top: 9px;
`;

const ButtonBox = styled(Box)({
  display: 'flex',
});

const getFirstMonday = (): Dayjs => dayjs().startOf('week').add(1, 'day');
const getNextSunday = (): Dayjs => dayjs().startOf('week').add(1, 'week').add(1, 'day');

const NextAppointments: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const isTrainer = user.userType === UserType.TRAINER;
  const api = !isTrainer ? process.env.CLIENT_API : process.env.TRAINER_API;
  const { data } = useProtectedCall(`${api}/get-appointments`, 'appointments');
  const [appointmentData, setAppointmentData] = useState<Appointment>(null);
  const [exercises, setExercises] = useState<Exercise[]>(null);
  const [startDate, setStartDate] = useState(() => getFirstMonday());
  const [endDate, setEndDate] = useState(() => getNextSunday());
  const { favExercises } = useExercisesContext();

  const link = `../${FeaturePaths.NEW_APPOINTMENT}`;

  const methods = useForm<DateRangeForm>({
    resolver: yupResolver(StartDateSchema),
    defaultValues: {
      startDate,
    },
  });

  const handleDetailClose = () => {
    setAppointmentData(null);
  };

  const handleExercises = (ex: Exercise[]) => {
    const selectedExercises = favExercises.current.filter((item) => ex.some((e) => e.id === item.id));
    setExercises(selectedExercises);
  };

  const handleExerciseClose = () => {
    setExercises(null);
  };

  const onCardClick = (a: Appointment) => {
    setAppointmentData(a);
  };

  const onNewClick = () => {
    navigate(link);
  };

  const onSubmit = (formData: DateRangeForm) => {
    setStartDate(dayjs(formData.startDate));
  };
  useEffect(() => {
    const nextSunday = dayjs(startDate).add(1, 'week').day(0);
    setEndDate(nextSunday);
  }, [startDate]);

  const handleDatePickerClose = () => {
    methods.handleSubmit(onSubmit)();
  };

  if (!data?.length && isTrainer) {
    return <NoData message="No appointments yet" buttonText="Create" link={link} />;
  }

  // if (!data?.length && !isTrainer) {
  //   return <NoData message="No appointments yet" buttonText="Request" link={link} />;
  // }

  const filteredAppointments = data.filter((appointment) => {
    const appointmentStartDate = dayjs(appointment.startDate);
    const appointmentEndDate = dayjs(appointment.endDate);
    return (
      appointmentStartDate.isSame(startDate, 'day')
        || appointmentStartDate.isAfter(startDate, 'day')
    ) && (
      appointmentEndDate.isSame(endDate, 'day')
        || appointmentEndDate.isBefore(endDate, 'day')
    );
  });

  const formattedStartDate = startDate.format('DD.MM');
  const formattedEndDate = endDate.format('DD.MM');
  const weekTitle = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <PageContainer>
      <NoTabsContentContainer>
        <WeekTitle variant="h2">{weekTitle}</WeekTitle>
        <ButtonBox>
          <FormProvider {...methods}>
            <DateInput name="startDate" label="Which Monday" isRange onClose={handleDatePickerClose} />
          </FormProvider>
          {isTrainer && (
          <StyledDefaultButton variant="outlined" color="secondary" onClick={onNewClick}>
            Add new
          </StyledDefaultButton>
          )}
        </ButtonBox>
        <Calendar appointments={filteredAppointments} startDate={startDate} onCardClick={onCardClick} />
        <AppointmentModal appointmentData={appointmentData} handleClose={handleDetailClose} handleExercises={handleExercises} />
        <SessionExerciseModal exercises={exercises} handleClose={handleExerciseClose} />
      </NoTabsContentContainer>
    </PageContainer>
  );
};

export default NextAppointments;
