import { Outlet, useLocation } from 'react-router-dom';
import { AuthContainer } from './AuthLayout.css';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Footer } from '../components/Extras.css';

export const MainAppLayout: React.FunctionComponent<{}> = () => {
	const location = useLocation();
	const showSidebar = location.pathname !== '/settings';

	return (
		<AuthContainer>
			<Navbar />
			{showSidebar && (<Sidebar />)}
			<Outlet />
			<Footer>WIP</Footer>
		</AuthContainer>
	);
};
