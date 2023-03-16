import { Outlet } from 'react-router-dom';
import { LogoContainer } from '../components/Navbar/Navbar.css';
import { AuthContainer } from './AuthLayout.css';

export const AuthLayout: React.FunctionComponent<{}> = () => {
	return (
		<AuthContainer>
			{/*<LogoContainer />*/}
			<Outlet />
		</AuthContainer>
	);
};
