import {
  createContext, useContext, useEffect, useState,
} from 'react';
import * as React from 'react';
import {
  getFormattedUser,
  getUserAPI,
  TrainerInfo,
  UserFormattedInfo,
} from '../helpers/fnRequest';
import { UserType } from '../Types';
import { useProtectedCallback } from '../hooks/useProtectedCall';

interface IAdminContext {
  selectedUser: TrainerInfo;
  setSelectedUser: (u: TrainerInfo) => void;
  resetUsers: () => void;
  users: UserFormattedInfo[];
  setUserForDeletion: (u: TrainerInfo) => void;
  userForDeletion: TrainerInfo;
  setUserForPicInspection: (u: TrainerInfo) => void;
  userForPicInspection: TrainerInfo;
  successfullySaved: boolean;
  setSuccessfullySaved: (f: boolean) => void;
  errorMessage: string;
  setErrorMessage: any;
}
// FIXME - any

export const AdminContext = createContext<IAdminContext | null>(null);

export const AdminProvider: React.FunctionComponent<{
  userType: UserType;
  children: React.ReactNode;
}> = ({ userType, children }) => {
  const [selectedUser, setSelectedUser] = useState<TrainerInfo>(null);
  const [userForDeletion, setUserForDeletion] = useState<TrainerInfo>(null);
  const [userForPicInspection, setUserForPicInspection] = useState<TrainerInfo>(null);
  const [successfullySaved, setSuccessfullySaved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [users, setUsers] = useState<UserFormattedInfo[]>([]);

  const fetchUsers = useProtectedCallback(getUserAPI(userType), 'users', (data) => {
    const formattedUsers = getFormattedUser(data, userType);
    setUsers(formattedUsers);
  });

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  const resetUsers = () => {
    fetchUsers();
  };

  return (
    <AdminContext.Provider value={{
      selectedUser,
      setSelectedUser,
      resetUsers,
      users,
      userForDeletion,
      setUserForDeletion,
      userForPicInspection,
      setUserForPicInspection,
      successfullySaved,
      setSuccessfullySaved,
      errorMessage,
      setErrorMessage,
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
