import { Outlet, useLocation } from 'react-router-dom';
import { AuthContainer } from './AuthLayout.css';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

export const MainAppLayout: React.FunctionComponent<{}> = () => {
	const location = useLocation();
	const showSidebar = location.pathname !== '/settings';

	return (
		<AuthContainer>
			<Navbar />
			{showSidebar && (<Sidebar />)}
			<Outlet />
		</AuthContainer>
	);
};
