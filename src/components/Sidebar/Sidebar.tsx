import * as React from 'react';
import { Link } from 'react-router-dom';
import {Greeting, LogoContainer, MenuItem, SideContainer, SideMenuContainer } from './Sidebar.css';
import { useAuthContext } from '../../Providers/AuthContext';
import { Menu } from '../Navbar/Navbar';

// TODO: types file
export enum SidePaths {
	DASHBOARD = "/dashboard",
	BUDDIES = "/buddies",
	HISTORIC = "/historic",
	EXERCISES = "/exercises",
}

const sideMenuOptions: Menu[] = [
	{
		name: "Dashboard",
		path: SidePaths.DASHBOARD
	},
	{
		name: "My Buddies",
		path: SidePaths.BUDDIES
	},
	{
		name: "My Exercises",
		path: SidePaths.EXERCISES
	},
	{
		name: "My Past Achievements",
		path: SidePaths.HISTORIC
	},
]



const Navbar: React.FC = () => {
	// const [currentIndex, setCurrentIndex] = useState<number>(0);
	const { user } = useAuthContext();


	return (
		<SideContainer>
			<LogoContainer/>
			<Greeting>{`Hey there ${user.username}`}</Greeting>
			<SideMenuContainer>
				<ul>
					{sideMenuOptions.map((item) => {
						return (
							<Link to={item.path} key={`menu-${item.name}`}>
								<MenuItem>{item.name}</MenuItem>
							</Link>
						);
					})}
				</ul>
			</SideMenuContainer>
		</SideContainer>
	);
}

export default Navbar;
