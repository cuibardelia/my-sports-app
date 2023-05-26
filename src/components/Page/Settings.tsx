import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react'; // Replace with the path to your Upload component
import axios from 'axios';
import UploadPic from './Common/UploadPic';
import { getProtectedHeaders } from '../../helpers/fnRequest';
import { useAuthContext } from '../../Providers/AuthContext';
import { IClient } from '../../Types';

const SettingsContainer = styled(Container)({
  marginTop: '2rem',
});

const SettingsPage = () => {
  const { user, token, resetUser } = useAuthContext();
  const client = user as IClient;
  // FIXME: types for all states
  const [currentWeight, setCurrentWeight] = useState(client.currentWeight || '');
  const [height, setHeight] = useState(client.height || '');
  const [goalWeight, setGoalWeight] = useState(client.goalWeight || '');
  const [profilePic, setProfilePic] = useState(client.picUrl || '');
  const [savedSuccessfully, setSavedSuccessfully] = useState<boolean>(false);

  const handleSaveSettings = () => {
    console.log('Settings saved:', { currentWeight, height, goalWeight });
    const body = {
      currentWeight, height, goalWeight, picUrl: profilePic,
    };
    axios.put(`${process.env.CLIENT_API}/update-settings`, body, { headers: getProtectedHeaders(token) })
      .then((response) => {
        setSavedSuccessfully(true);
        resetUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadComplete = (imageUrl) => {
    setProfilePic(imageUrl);
  };

  // const onModalClose = () => {
  //   setSavedSuccessfully(false);
  // };
  //
  // const message = 'Your settings have been updated successfully.';

  return (
    <SettingsContainer maxWidth="sm">
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="h5">Settings</Typography>

            <TextField
              label="Weight"
              variant="outlined"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />

            <TextField
              label="Height"
              variant="outlined"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />

            <TextField
              label="Goal Weight"
              variant="outlined"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
            />

            <Typography variant="h6">Profile Picture</Typography>

            <UploadPic onUploadComplete={handleUploadComplete} />

            <Button variant="contained" onClick={handleSaveSettings}>
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* <SuccessModal open={succcessfullySaved} onClose={onModalClose} message={message} /> */}
    </SettingsContainer>
  );
};

export default SettingsPage;
