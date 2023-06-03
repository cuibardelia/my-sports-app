import * as React from 'react';
import {
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import UploadPic from '../Page/Common/UploadPic';
import { getProtectedHeaders } from '../../helpers/fnRequest';
import { IClient } from '../types/User';
import { useAuthContext } from '../../Providers/AuthContext';

interface IProfileUpdate {
  handleSuccess: (response: IClient) => void;
}
const ProfilePictureUpdate: React.FC<IProfileUpdate> = ({ handleSuccess }) => {
  const { user, token } = useAuthContext();
  const client = user as IClient;

  const [profilePic, setProfilePic] = useState(client.picUrl || '');

  const handleProfilePic = () => {
    const body = {
      picUrl: profilePic,
    };
    axios.put(`${process.env.CLIENT_API}/update-photo`, body, { headers: getProtectedHeaders(token) })
      .then((response) => {
        handleSuccess(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadComplete = (imageUrl: string) => {
    setProfilePic(imageUrl);
  };

  return (
    <>
      <Typography variant="h6">Profile Picture</Typography>
      <UploadPic onUploadComplete={handleUploadComplete} />
      <Button variant="contained" onClick={handleProfilePic}>
        Save
      </Button>
    </>
  );
};

export default ProfilePictureUpdate;
