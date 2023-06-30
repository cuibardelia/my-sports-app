import * as React from 'react';
import {
  Avatar, Card, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import { IClient } from '../types/User';

export const BuddyAvatar = styled(Avatar)<{ isClientModal?: boolean }>(({ theme, isClientModal }) => ({
  width: isClientModal ? '300px' : '100%',
  height: 'auto',
  aspectRatio: '1/1',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 0,
}));

const StyledContainer = styled('div')<{ allowsPick: boolean }>`
  ${(props) => props.allowsPick
      && 'width: 160px'}
`;

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
    <StyledContainer allowsPick={allowsPick}>
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
    </StyledContainer>
  );
};

export default ClientCard;
