import {
  createContext, useContext, useEffect, useState,
} from 'react';
import * as React from 'react';
import {
  getFormattedUser,
  getUserAPI,
} from '../helpers/fnRequest';
import { useProtectedCallback } from '../hooks/useProtectedCall';
import { ITrainer, IUser, UserType } from '../components/types/User';

interface IAdminContext {
  selectedUser: ITrainer;
  setSelectedUser: (u: ITrainer) => void;
  resetUsers: () => void;
  users: IUser[];
  setUserForDeletion: (u: ITrainer) => void;
  userForDeletion: ITrainer;
  setUserForPicInspection: (u: ITrainer) => void;
  userForPicInspection: ITrainer;
  successfullySaved: boolean;
  setSuccessfullySaved: (f: boolean) => void;
  errorMessage: string;
  setErrorMessage: any;
}

export const AdminContext = createContext<IAdminContext | null>(null);

export const AdminProvider: React.FunctionComponent<{
  userType: UserType;
  children: React.ReactNode;
}> = ({ userType, children }) => {
  const [selectedUser, setSelectedUser] = useState<ITrainer>(null);
  const [userForDeletion, setUserForDeletion] = useState<ITrainer>(null);
  const [userForPicInspection, setUserForPicInspection] = useState<ITrainer>(null);
  const [successfullySaved, setSuccessfullySaved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [users, setUsers] = useState([]);

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
