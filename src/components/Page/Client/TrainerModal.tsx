import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { useAuthContext } from '../../../Providers/AuthContext';
import { isAmongPTList } from '../../../helpers/fnFeatures';
import { getProtectedHeaders } from '../../../helpers/fnRequest';
import { ITrainer } from '../../types/User';
import TrainerCard from '../Trainers/TrainerCard';

interface TrainerModalProps {
  trainer: ITrainer;
  handleClose: () => void;
}

const TrainerModal: React.FC<TrainerModalProps> = ({ trainer, handleClose }) => {
  const { user, token, resetUser } = useAuthContext();
  const [isPT, setIsPT] = useState<boolean>(isAmongPTList(trainer, user));

  useEffect(() => {
    if (trainer && user) {
      setIsPT(isAmongPTList(trainer, user));
    }
  }, [trainer, user]);

  const addAsPt = () => {
    axios.post(`${process.env.CLIENT_API}/add-personal-trainer`, { _id: trainer._id }, {
      headers: getProtectedHeaders(token),
    })
      .then((response) => {
        setIsPT(true);
        resetUser(response.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionText = 'Add as a Personal Trainer';

  if (!trainer) {
    return null;
  }

  return (
    <Dialog open={!!trainer} onClose={handleClose} maxWidth="md">
      <DialogTitle>{`${trainer.firstName} ${trainer.lastName}`}</DialogTitle>
      <DialogContent>
        <TrainerCard user={trainer} />
        {!isPT && (
        <DialogActions>
          <Button onClick={addAsPt} variant="outlined" color="primary">
            {actionText}
          </Button>
        </DialogActions>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default TrainerModal;
