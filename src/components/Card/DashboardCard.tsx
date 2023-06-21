import React, { useEffect, useState } from 'react';
import {
  CardContent, Typography, Box,
} from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../../Providers/AuthContext';
import { IClient, UserType } from '../types/User';
import {
  LightCard, StyledCard,
} from './Dashboard.css';
import { getProtectedHeaders } from '../../helpers/fnRequest';
import CheeringMessage from './CheeringMessage';
import AppointmentMessage from './AppointmentMessage';
import AchieversList from './AchieversList';
import WinnersList from './WinnersList';
import TrainerMessage from './TrainerMessage';

export interface TopClient {
  client: IClient;
  appointmentCount?: number;
}

interface LatestAchiever {
  username: string;
  picUrl: string;
  dateAchieved: Date;
  weightStatus: string;
}

// TODO REFACTOR
const DashboardCard = () => {
  const { user, token } = useAuthContext();
  const [topUsers, setTopUsers] = useState<TopClient[]>([]);
  const [latestAchievers, setLatestAchievers] = useState<LatestAchiever[]>([]);

  const options = {
    headers: {
      ...getProtectedHeaders(token),
      'X-User-Type': user.userType,
    },
  };

  useEffect(() => {
    // FIXME: env
    axios.get('http://localhost:5000/api/user/get-winners', options)
      .then((response) => {
        setTopUsers(response.data.topClients);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get('http://localhost:5000/api/user/get-objecive-attainers', options)
      .then((response) => {
        setLatestAchievers(response.data.clients);
        console.log(response.data.clients);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isClient = user.userType === UserType.CLIENT;

  return (
    <LightCard>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box flexGrow={1} mr={2}>
            {isClient ? (<CheeringMessage />) : (<TrainerMessage />)}
          </Box>
          <Box flexGrow={1}>
            <AppointmentMessage />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" mt={2}>
          <Box flexGrow={1} mr={2}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" component="div">
                  This week&apos;s top active users:
                </Typography>
                <Typography variant="h6" component="div">
                  Most active users in FitBud
                </Typography>
              </CardContent>
              <WinnersList winners={topUsers} />
            </StyledCard>
          </Box>
          <Box flexGrow={1}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" component="div">
                  Latest achievers:
                </Typography>
                <Typography variant="h6" component="div">
                  Buddies who recently achieved their goals
                </Typography>
              </CardContent>
              <AchieversList winners={latestAchievers} />
            </StyledCard>
          </Box>
        </Box>
      </Box>
    </LightCard>
  );
};

export default DashboardCard;
