import { useState } from 'react';
import { Link } from 'react-router-dom';
import {LogoContainer, MenuItem, NavContainer } from './Navbar.css';

enum Paths {
    HOME = "/",
    EXERCISES = "/exercises",
    TRAINERS = "/trainers",
    ABOUT = "/about"
}

// TODO: type
const menuOptions = [
    {
        name: "Home",
        path: Paths.HOME
    },
    {
        name: "Exercises",
        path: Paths.EXERCISES
    },
    {
        name: "Trainers",
        path: Paths.TRAINERS
    },
    {
        name: "About",
        path: Paths.ABOUT
    },
]

const Navbar: React.FC = () => {
    // const [currentIndex, setCurrentIndex] = useState<number>(0);

    return (
        <NavContainer>
            <LogoContainer/>
            <ul>
                {menuOptions.map((item, i) => {
                    return (
                        <Link to={item.path} key={`menu-${item.name}`}>
                            <MenuItem>{item.name}</MenuItem>
                        </Link>
                    );
                })}
            </ul>
        </NavContainer>
    );
}

export default Navbar;
