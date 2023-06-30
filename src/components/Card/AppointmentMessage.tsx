import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  DefaultLink, GradientCard, StyledEmoji,
} from './Dashboard.css';
import { useAuthContext } from '../../Providers/AuthContext';
import { UserType } from '../types/User';
import { useProtectedCall } from '../../hooks/useProtectedCall';

const AppointmentMessage: React.FC = () => {
  const { user } = useAuthContext();
  const isClient = user.userType === UserType.CLIENT;
  const api = isClient ? process.env.CLIENT_API : process.env.TRAINER_API;
  const { data } = useProtectedCall(`${api}/get-appointments`, 'appointments');
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const now = dayjs();
    const startOfWeek = now.startOf('week').startOf('day');
    const endOfWeek = now.endOf('week').add(1, 'day').endOf('day');

    const appointmentsThisWeek = data.filter((appointment) => {
      const startDate = dayjs(appointment.startDate);
      return (startDate.isAfter(startOfWeek) && startDate.isBefore(endOfWeek)) || startDate.isSame(startOfWeek) || startDate.isSame(endOfWeek);
    });

    const count = appointmentsThisWeek.length || 0;
    setAppointmentCount(count);
  }, [data]);

  return (
    <GradientCard>
      <CardContent>
        <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
          <StyledEmoji>💪</StyledEmoji>
          {'  You have '}
          <DefaultLink to="../appointments">
            {appointmentCount}
            {'  PT sessions'}
          </DefaultLink>
          {' this week.'}
        </Typography>
      </CardContent>
    </GradientCard>
  );
};

export default AppointmentMessage;
