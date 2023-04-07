import { Outlet } from 'react-router-dom';
import { LogoContainer } from '../components/Sidebar/Sidebar.css';
import { AuthContainer } from './AuthLayout.css';
import styled from 'styled-components';
import { Footer } from '../components/Extras.css';

const AuthLogoContainer = styled(LogoContainer)`
	position: fixed;
	top: 20px;
	left: 20px;
`

export const AuthLayout: React.FunctionComponent<{}> = () => {
	return (
		<AuthContainer>
			<AuthLogoContainer />
			<Outlet />
			<Footer>WIP</Footer>
		</AuthContainer>
	);
};
