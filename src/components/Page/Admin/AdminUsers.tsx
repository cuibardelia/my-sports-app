import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageContainer from '../../PageContainer.css';
import { useAuthContext } from '../../../Providers/AuthContext';
import { UserTable } from '../../Tables/UserTable';
import { UserType } from '../../../Types';
import {
  getFormattedUser, getProtectedHeaders, getUserAPI, UserFormattedInfo,
} from '../../../helpers/fnRequest';

const AdminUsers: React.FC<{ userType: UserType }> = ({ userType }) => {
  const { token } = useAuthContext();
  const [users, setUsers] = useState<UserFormattedInfo[]>([]);

  const options = {
    headers: getProtectedHeaders(token),
  };

  useEffect(() => {
    axios.get(getUserAPI(userType), options)
      .then((response) => {
        setUsers(getFormattedUser(response.data.users, userType));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userType]);

  return (
    <PageContainer>
      <main>
        <UserTable users={users} />
      </main>
    </PageContainer>
  );
};
export default AdminUsers;
