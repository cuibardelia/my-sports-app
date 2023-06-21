import * as React from 'react';
import {
  Avatar, styled,
} from '@mui/material';
import { IUser } from '../types/User';

export const HoverAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: '5px',
  transition: 'background-color 0.3s',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  transition: 'background-color 0.3s',
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  border: `2px solid ${theme.palette.secondary.main}`,
}));

interface IAvatar {
  user: IUser;
}
const MainAvatar: React.FC<IAvatar> = ({ user }) => (
  <HoverAvatar alt={user.name} src={user.picUrl} />
);
export default MainAvatar;
