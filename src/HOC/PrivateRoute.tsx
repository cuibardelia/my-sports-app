import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Providers/AuthContext';
import { MainAppLayout } from '../layout/MainAppLayout';
import { UserType } from '../Types';
import { getDefaultRoute } from '../helpers/fnUser';

function PrivateRoute({ userType }) {
  const { token, user } = useAuthContext();

  const isAuthenticated = !!token;

  switch (userType) {
    case 'admin':
      if (isAuthenticated && user.userType === UserType.ADMIN) {
        return (
          <MainAppLayout>
            <Outlet />
          </MainAppLayout>
        );
      }
      break;
    case 'trainer':
      if (isAuthenticated && user.userType === UserType.TRAINER) {
        return (
          <MainAppLayout>
            <Outlet />
          </MainAppLayout>
        );
      }
      break;
    case 'client':
      if (isAuthenticated && user.userType === UserType.CLIENT) {
        return (
          <MainAppLayout>
            <Outlet />
          </MainAppLayout>
        );
      }
      break;
    default:
      if (isAuthenticated) {
        return (
        // TODO: NOT auhtorized + button
          <Navigate to={getDefaultRoute(user.userType)} />
        );
      }
      break;
  }

  return <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  userType: UserType,
};

export default PrivateRoute;
