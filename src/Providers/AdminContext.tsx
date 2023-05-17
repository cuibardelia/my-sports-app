import {
  createContext, useContext, useEffect, useState,
} from 'react';
import * as React from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';
import {
  getFormattedUser,
  getProtectedHeaders,
  getUserAPI,
  TrainerInfo,
  UserFormattedInfo,
} from '../helpers/fnRequest';
import { UserType } from '../Types';

interface IAdminContext {
  selectedUser: TrainerInfo;
  setSelectedUser: (u: TrainerInfo) => void;
  resetUsers: () => void;
  users: UserFormattedInfo[];
  setUserForDeletion: (u: TrainerInfo) => void;
  userForDeletion: TrainerInfo;
  setUserForPicInspection: (u: TrainerInfo) => void;
  userForPicInspection: TrainerInfo;
}

export const AdminContext = createContext<IAdminContext | null>(null);

export const AdminProvider: React.FunctionComponent<{
  userType: UserType;
  children: React.ReactNode;
}> = ({ userType, children }) => {
  const [selectedUser, setSelectedUser] = useState<TrainerInfo>(null);
  const [userForDeletion, setUserForDeletion] = useState<TrainerInfo>(null);
  const [userForPicInspection, setUserForPicInspection] = useState<TrainerInfo>(null);
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

  // FIXME: reuse
  const resetUsers = () => {
    axios.get(getUserAPI(userType), options)
      .then((response) => {
        setUsers(getFormattedUser(response.data.users, userType));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AdminContext.Provider value={{
      selectedUser, setSelectedUser, resetUsers, users, userForDeletion, setUserForDeletion, userForPicInspection, setUserForPicInspection,
    }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const value = useContext(AdminContext);

  if (value === null) {
    throw new Error('Please wrap your components in the AdminProvider!');
  }

  return value;
};
