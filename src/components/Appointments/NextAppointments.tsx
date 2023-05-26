import * as React from 'react';
import { useState } from 'react';
import AppointmentModal from '../Modal/AppointmentModal';
import SessionExerciseModal from '../Modal/SessionExerciseModal';
import { Appointment } from '../../helpers/fnSession';
import { Exercise } from '../../Types';
import { useProtectedCall } from '../../hooks/useProtectedCall';
import NoData from '../NotFound/NoData';
import AppointmentCard from '../Card/AppointmentCard';

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

  if (!data?.length) {
    return <NoData message="No appointments yet" />;
  }

  return (
    <div>
      {data.map((appointment) => (
        <AppointmentCard appointment={appointment} onCardClick={onCardClick} />
      ))}
      <AppointmentModal appointmentData={appointmentData} handleClose={handleDetailClose} handleExercises={handleExercises} />
      <SessionExerciseModal exercises={exercises} handleClose={handleExerciseClose} />
    </div>
  );
};

export default NextAppointments;
