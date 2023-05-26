import {
  Table, TableBody, TableContainer, TableHead, Paper, TableCell, TableRow,
} from '@mui/material';
import * as React from 'react';
import { UserRow } from './UserRow';
import { useAdminContext } from '../../Providers/AdminContext';
import { UserType } from '../../Types';

interface IUserTable {
  userType: UserType;
}

export const UserTable: React.FC<IUserTable> = ({ userType }) => {
  const { users } = useAdminContext();
  const extraOption = userType === UserType.CLIENT ? 'Username' : 'Specialties';

  if (!users) {
    return <div>NO Data</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>{extraOption}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
