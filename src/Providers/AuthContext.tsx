import * as React from 'react';
import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorage';
import { IUser } from '../Types';

// FIXME: linting & IDE
// TODO: error boundary

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
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorageState(tokenStorageKey);
  const [user, setUser, removeUser] = useLocalStorageState(userStorageKey);

  function login(data: IAuthData) {
    setToken(data.accessToken);
    setUser(data.user);
  }

  function logout() {
    removeToken();
    removeUser();
  }

  return (
    <AuthContext.Provider value={{
      token, user, login, logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error('Please wrap your components in the AuthContextProvider!');
  }

  return value;
}
