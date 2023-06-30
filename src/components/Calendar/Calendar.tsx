import React from 'react';
import { styled } from '@mui/system';
import {
  Box, Grid, Paper, Typography,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { Appointment } from '../../helpers/fnSession';
import AppointmentSmallCard from '../Card/AppointmentSmallCard';

const CalendarWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  padding: '20px',
});

const WeekDaysContainer = styled(Box)({
  borderBottom: '1px solid #ccc',
});

const DayNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.disabled,
  textAlign: 'center',
}));

const AppointmentNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

const DayInformation = styled(Typography)(({ theme }) => ({
  marginTop: 4,
  color: theme.palette.secondary.main,
}));

const Row = styled(Grid)`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
`;

const Item = styled(Paper)<{ isPast?: boolean }>(({ theme, isPast = false }) => ({
  flex: 1,
  padding: 10,
  minWidth: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  backgroundColor: isPast ? theme.palette.grey[300] : theme.palette.background.paper,
}));

const DaysItem = styled(Item)(({ theme }) => ({
  background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
  height: '4rem',
  display: 'display',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.disabled,
}));

interface CalendarProps {
  appointments: Appointment[];
  onCardClick: (a: Appointment) => void;
  startDate: Dayjs;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Calendar: React.FC<CalendarProps> = ({ appointments, onCardClick, startDate }) => {
  const dayAppointments: { [key: number]: Appointment[] } = {};

  appointments.forEach((appointment) => {
    const appointmentStartDate = dayjs(appointment.startDate);
    const day = (appointmentStartDate.day() + 6) % 7;
    if (!dayAppointments[day]) {
      dayAppointments[day] = [];
    }
    dayAppointments[day].push(appointment);
  });

  const today = dayjs();
  const weekStart = startDate.clone().startOf('week');
  const isPastDate = (date: Dayjs): boolean => date.isBefore(today, 'day');

  return (
    <CalendarWrapper>
      <WeekDaysContainer>
        <Row container spacing={2}>
          {weekDays.map((day) => (
            <DaysItem key={`${day}-name`}>
              <DayNumber variant="h4">{day.substring(0, 3)}</DayNumber>
            </DaysItem>
          ))}
        </Row>
      </WeekDaysContainer>
      <Row container spacing={2}>
        {weekDays.map((day, index) => {
          const currentDate = weekStart.add(index, 'day');
          const isPast = isPastDate(currentDate);
          return (
            <Item key={`${day}-data`} isPast={isPast}>
              <AppointmentNumber variant="h5">
                {dayAppointments[index]?.length || 0}
              </AppointmentNumber>
              <DayInformation variant="body2">
                {dayAppointments[index]?.map((a) => (
                  <div key={a._id} onClick={() => onCardClick(a)}>
                    <AppointmentSmallCard name={a.session.name} />
                  </div>
                ))}
              </DayInformation>
            </Item>
          );
        })}
      </Row>
    </CalendarWrapper>
  );
};

export default Calendar;
