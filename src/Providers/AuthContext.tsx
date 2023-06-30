import * as React from 'react';
import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorage';
import { IUser } from '../components/types/User';

const tokenStorageKey = 'token';
const userStorageKey = 'user';

export interface IAuthData {
  accessToken: string;
  user: IUser;
}

interface IAuthContext {
  token: string;
  user: IUser;
  login: (data: IAuthData) => void;
  logout: () => void;
  resetUser: (data: IUser) => void;
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorageState(tokenStorageKey);
  const [user, setUser, removeUser] = useLocalStorageState(userStorageKey);

  const login = (data: IAuthData) => {
    setToken(data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    removeToken();
    removeUser();
  };

  const resetUser = (data: IUser) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{
      token, user, login, logout, resetUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error('Please wrap your components in the AuthContextProvider!');
  }

  return value;
};
