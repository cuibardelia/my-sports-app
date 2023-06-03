import * as React from 'react';
import {
  Avatar, Card, styled, Typography,
} from '@mui/material';
import { deepPurple, green } from '@mui/material/colors';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import { IClient } from '../types/User';

const BuddyAvatar = styled(Avatar)(() => ({
  width: '100%',
  height: 'auto',
  aspectRatio: '1/1',
  backgroundColor: green[300],
  color: deepPurple[300],
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 0,
}));

interface IClientCard {
  buddy: IClient,
  allowsPick?: boolean,
}

// TODO: use formatted
const ClientCard: React.FC<IClientCard> = ({ buddy, allowsPick = false }) => {
  const [isPicked, setIsPicked] = useState<boolean>(false);

  const handlePick = () => {
    setIsPicked((prev) => !prev);
  };

  return (
    <Card key={buddy._id} variant="outlined">
      <BuddyAvatar src={buddy.picUrl} alt={buddy.firstName}>
        {buddy.firstName.charAt(0)}
      </BuddyAvatar>
      <Typography variant="subtitle1" align="center">{`${buddy.firstName} ${buddy.lastName}`}</Typography>
      {allowsPick && (
        <IconButton onClick={handlePick}>
          <Radio checked={isPicked} color="primary" />
        </IconButton>
      )}
    </Card>
  );
};

export default ClientCard;
