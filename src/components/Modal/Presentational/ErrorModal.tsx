import * as React from 'react';
import ConfirmActionModal from './ConfirmActionModal';

interface IErrorModal {
  error: string;
  handleClose: () => void;
}

const ErrorModal: React.FC<IErrorModal> = ({ error, handleClose }) => (
  <ConfirmActionModal open={!!error} message={error} onClose={handleClose} />
);
export default ErrorModal;
