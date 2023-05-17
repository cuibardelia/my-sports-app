import * as React from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { getProtectedHeaders } from '../../../helpers/fnRequest';
import { useAdminContext } from '../../../Providers/AdminContext';
import { useAuthContext } from '../../../Providers/AuthContext';
import UploadPic from '../Common/UploadPic';

// TODO: remove my Card, no longer needed :(
const StyledCard = styled(Card)({
  maxWidth: 400,
});

const PicModal: React.FC = () => {
  const { userForPicInspection, setUserForPicInspection, resetUsers } = useAdminContext();
  const { token } = useAuthContext();

  const handleClose = () => {
    setUserForPicInspection(null);
  };

  const handleUploadComplete = (imageUrl) => {
    console.log('Uploaded Image URL:', imageUrl);
    const body = {
      _id: userForPicInspection.id,
      picUrl: imageUrl,
    };
    axios
      .post('http://localhost:5000/api/admin/update-trainer', body, {
        headers: getProtectedHeaders(token),
        data: body,
      })
      .then(() => {
        console.log('Successfully Updated User');
        resetUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const avatarUrl = userForPicInspection?.picUrl;

  return (
    <Dialog open={!!userForPicInspection} onClose={handleClose}>
      <DialogTitle>Avatar</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          {avatarUrl && (
          <StyledCard>
            <Box p={3} textAlign="center">
              <img src={avatarUrl} alt="Avatar" style={{ maxWidth: '100%' }} />
            </Box>
          </StyledCard>
          )}
          <UploadPic onUploadComplete={handleUploadComplete} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PicModal;
