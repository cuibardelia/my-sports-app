import {
  Avatar, ButtonBase, IconButton, styled, TableCell, TableRow,
} from '@mui/material';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { lightGreen, purple } from '@mui/material/colors';
import { useAdminContext } from '../../Providers/AdminContext';
import {
  IClient, ITrainer, IUser, UserType,
} from '../types/User';

interface UserRowProps {
  user: IUser;
}

const HoverAvatar = styled(Avatar)`
  transition: background-color 0.3s;

  &:hover {
    background-color: ${purple[300]};
  }
`;

export const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const { setSelectedUser, setUserForDeletion, setUserForPicInspection } = useAdminContext();
  const extraOption = user.userType === UserType.CLIENT ? (user as IClient).username : (user as ITrainer).specialties;
  const isClient = user.userType === UserType.CLIENT;

  const onEditClick = () => {
    setSelectedUser(user as ITrainer);
  };

  const onDeleteClick = () => {
    setUserForDeletion(user as ITrainer);
  };

  const onAvatarClick = () => {
    if (!isClient) {
      setUserForPicInspection(user as ITrainer);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>
        <ButtonBase component="div" onClick={onAvatarClick}>
          <HoverAvatar alt={user.name} src={user.picUrl} sx={{ bgcolor: lightGreen[500] }} />
        </ButtonBase>
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{extraOption}</TableCell>
      <TableCell>
        { !isClient && (
        <IconButton onClick={onEditClick}>
          <EditIcon />
        </IconButton>
        )}
        <IconButton onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
