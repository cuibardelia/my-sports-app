import * as React from 'react';
import { useState } from 'react';
import AppointmentModal from '../Modal/AppointmentModal';
import SessionExerciseModal from '../Modal/SessionExerciseModal';
import { Appointment } from '../../helpers/fnSession';
import { useProtectedCall } from '../../hooks/useProtectedCall';
import AppointmentCard from '../Card/AppointmentCard';
import { Exercise } from '../types/Exercise';
import NoData from '../Empty/NoData';
import DefaultButton from '../Button/DefaultButton';
import { PageContainer } from '../PageContainer.css';
import { FeaturePaths } from '../../helpers/fnPaths';

const NextAppointments: React.FC = () => {
  const { data } = useProtectedCall(`${process.env.TRAINER_API}/get-appointments`, 'appointments');
  const [appointmentData, setAppointmentData] = useState<Appointment>(null);
  const [exercises, setExercises] = useState<Exercise[]>(null);

  const handleDetailClose = () => {
    setAppointmentData(null);
  };

  const handleExercises = (e: Exercise[]) => {
    setExercises(e);
  };

  const handleExerciseClose = () => {
    setExercises(null);
  };

  const onCardClick = (a: Appointment) => {
    setAppointmentData(a);
  };

  const link = `../${FeaturePaths.NEW_APPOINTMENT}`;

  if (!data?.length) {
    return <NoData message="No appointments yet" buttonText="Create" link={link} />;
  }

  return (
    <PageContainer>

      <div>
        {data.map((appointment) => (
          <AppointmentCard appointment={appointment} onCardClick={onCardClick} />
        ))}
        <AppointmentModal appointmentData={appointmentData} handleClose={handleDetailClose} handleExercises={handleExercises} />
        <SessionExerciseModal exercises={exercises} handleClose={handleExerciseClose} />
        <DefaultButton
          link={link}
          text="Add New Appointment"
        />
      </div>
    </PageContainer>
  );
};

export default NextAppointments;
