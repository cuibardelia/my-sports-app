import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Providers/AuthContext';
import { MainAppLayout } from '../layout/MainAppLayout';

function PrivateRoute() {
  const { token } = useAuthContext();

  const isAuthenticated = !!token;

  return (
    isAuthenticated ? <MainAppLayout><Outlet /></MainAppLayout> : <Navigate to="/" />
  );
}

export default PrivateRoute;
