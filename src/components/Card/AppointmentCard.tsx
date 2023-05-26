import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getFormattedDate } from '../../helpers/fnRequest';
import { Appointment } from '../../helpers/fnSession';

interface IAppointmentCard {
  appointment: Appointment,
  onCardClick: (a: Appointment) => void;
}

const AppointmentCard: React.FC<IAppointmentCard> = ({ appointment, onCardClick }) => (
  <Card key={appointment._id} variant="outlined" onClick={() => onCardClick(appointment)}>
    <CardContent>
      <Typography variant="h5">{appointment?.session?.name}</Typography>
      <Typography variant="h6">{getFormattedDate(new Date(appointment?.startDate))}</Typography>
      <Typography variant="subtitle1">{appointment?.roomName}</Typography>
    </CardContent>
  </Card>
);

export default AppointmentCard;
