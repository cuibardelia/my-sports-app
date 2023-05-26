import * as React from 'react';
import { useAdminContext } from '../../../Providers/AdminContext';
import ErrorModal from './ErrorModal';

const ActionModal = () => {
  const { errorMessage, setErrorMessage } = useAdminContext();

  const handleClose = () => {
    setErrorMessage(false);
  };

  return (
    <ErrorModal error={errorMessage} handleClose={handleClose} />
  );
};
export default ActionModal;
