import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { LogoContainer } from '../components/Sidebar/Sidebar.css';
import { AuthContainer } from './AuthLayout.css';

const AuthLogoContainer = styled(LogoContainer)`
    position: fixed;
    top: 20px;
    left: 20px;
`;

export const AuthLayout: React.FunctionComponent = () => (
  <AuthContainer>
    <AuthLogoContainer />
    <Outlet />
  </AuthContainer>
);
