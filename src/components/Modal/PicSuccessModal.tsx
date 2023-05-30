import * as React from 'react';
import ConfirmActionModal from './Presentational/ConfirmActionModal';
import { useAdminContext } from '../../Providers/AdminContext';

const PicSuccessModal = () => {
  const { successfullySaved, setSuccessfullySaved } = useAdminContext();

  const handleClose = () => {
    setSuccessfullySaved(false);
  };
  const message = 'Picture successfully saved';

  return (
    <ConfirmActionModal open={successfullySaved} onClose={handleClose} message={message} title="Picture Updated" />
  );
};
export default PicSuccessModal;
