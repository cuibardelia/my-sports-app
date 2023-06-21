import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import { useAuthContext } from '../Providers/AuthContext';
import { UserType } from '../components/types/User';
import Navbar from '../components/Navigation/Navbar';
import MainNavbar from '../components/Navigation/MainNavBar';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
`;

const renderTopNavi = (userType: UserType): JSX.Element => (userType === UserType.ADMIN ? <Navbar /> : <MainNavbar />);

export const MainAppLayout: React.FunctionComponent = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const showSidebar = location.pathname !== '/settings';

  return (
    <MainContainer>
      { renderTopNavi(user.userType) }
      {showSidebar && (<Sidebar />)}
      <Outlet />
    </MainContainer>
  );
};
