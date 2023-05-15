import {
  Avatar, TableCell, TableRow, IconButton,
} from '@mui/material';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserFormattedInfo } from '../../helpers/fnRequest';

interface UserRowProps {
  user: UserFormattedInfo;
}

export const UserRow: React.FC<UserRowProps> = ({ user }) => (
  <TableRow>
    <TableCell>
      <Avatar alt={user.name} src="FIXME" />
    </TableCell>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    {/* <TableCell>{user.specialties}</TableCell> */}
    <TableCell>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);
