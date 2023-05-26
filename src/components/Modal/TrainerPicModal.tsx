import * as React from 'react';
import axios from 'axios';
import { useAdminContext } from '../../Providers/AdminContext';
import { useAuthContext } from '../../Providers/AuthContext';
import { getProtectedHeaders } from '../../helpers/fnRequest';
import PicModal from '../Page/Admin/PicModal';

const TrainerPicModal: React.FC = () => {
  const {
    userForPicInspection, setUserForPicInspection, resetUsers, setSuccessfullySaved, setErrorMessage,
  } = useAdminContext();
  const { token } = useAuthContext();

  const handleClose = () => {
    setUserForPicInspection(null);
  };

  const handleUploadComplete = (imageUrl) => {
    const body = {
      _id: userForPicInspection.id,
      picUrl: imageUrl,
    };
    axios
      .put(`${process.env.ADMIN_API}/update-trainer`, body, {
        headers: getProtectedHeaders(token),
        data: body,
      })
      .then(() => {
        setSuccessfullySaved(true);
        resetUsers();
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  if (!userForPicInspection) {
    return null;
  }

  return (
    <PicModal open={!!userForPicInspection} handleClose={handleClose} picUrl={userForPicInspection?.picUrl} alt={userForPicInspection.email} handleUploadComplete={handleUploadComplete} />
  );
};

export default TrainerPicModal;
