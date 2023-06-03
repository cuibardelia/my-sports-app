import * as React from 'react';
import {
  Card, CardContent, Typography,
} from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import { SessionPlan } from '../../helpers/fnSession';

interface ISessionCard {
  session: SessionPlan,
  allowsPick?: boolean,
}

// FIXME: no multiple Pick
const SessionCard: React.FC<ISessionCard> = ({ session, allowsPick = false }) => {
  const [isPicked, setIsPicked] = useState<boolean>(false);

  const handlePick = () => {
    setIsPicked((prev) => !prev);
  };

  return (
    <Card key={session._id} variant="outlined">
      <CardContent>
        <Typography variant="h5">{session.name}</Typography>
      </CardContent>
      {allowsPick && (
      <IconButton onClick={handlePick}>
        <Radio checked={isPicked} color="primary" />
      </IconButton>
      )}
    </Card>
  );
};

export default SessionCard;
