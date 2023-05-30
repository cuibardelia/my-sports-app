import * as React from 'react';
import { useState } from 'react';
import AppointmentModal from '../Modal/AppointmentModal';
import SessionExerciseModal from '../Modal/SessionExerciseModal';
import { Appointment } from '../../helpers/fnSession';
import { useProtectedCall } from '../../hooks/useProtectedCall';
import AppointmentCard from '../Card/AppointmentCard';
import { Exercise } from '../types/Exercise';
import NoData from '../Empty/NoData';

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

  // TODO: New appt
  if (!data?.length) {
    return <NoData message="No appointments yet" buttonText="Create" link="new-appointment" />;
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
