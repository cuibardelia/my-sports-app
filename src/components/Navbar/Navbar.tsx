import * as React from 'react';
import { Link } from 'react-router-dom';
import {MenuItem, NavContainer } from './Navbar.css';
import { useAuthContext } from '../../Providers/AuthContext';
import { SidePaths } from '../Sidebar/Sidebar';

type AppPaths = TopPaths | SidePaths | AuthPaths;

export enum AuthPaths {
    LOGIN = "/",
    REGISTER = "/register",
    FORGOT = "/forgotpassword",
    RESET = "/passwordreset",
}

enum TopPaths {
    DASHBOARD = "/dashboard",
    TRAINERS = "/trainers",
    SETTINGS = "/settings"
}

export type Menu = {
   name: string;
   path: AppPaths;
}

const topMenuOptions: Menu[] = [
    {
        name: "Dashboard",
        path: TopPaths.DASHBOARD
    },
    {
        name: "Trainers",
        path: TopPaths.TRAINERS
    },
    {
        name: "Settings",
        path: TopPaths.SETTINGS
    },
]

const Navbar: React.FC = () => {
    // const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { logout } = useAuthContext();


    // TODO: tabindex for accessibility
    return (
        <NavContainer>
            <ul>
                {topMenuOptions.map((item) => {
                    return (
                        <Link to={item.path} key={`menu-${item.name}`}>
                            <MenuItem>{item.name}</MenuItem>
                        </Link>
                    );
                })}
                <Link
                    to={AuthPaths.LOGIN}
                    onClick={logout}
                >
                    <MenuItem>Logout</MenuItem>
                </Link>
            </ul>
        </NavContainer>
    );
}

export default Navbar;
