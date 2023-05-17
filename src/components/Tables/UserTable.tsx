import {
  Table, TableBody, TableContainer, TableHead, Paper, TableCell, TableRow,
} from '@mui/material';
import * as React from 'react';
import { UserRow } from './UserRow';
import { useAdminContext } from '../../Providers/AdminContext';

export const UserTable: React.FC = () => {
  const { users } = useAdminContext();
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
            <TableCell>Specialties</TableCell>
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
