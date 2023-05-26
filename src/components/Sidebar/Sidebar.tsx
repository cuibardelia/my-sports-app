import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Greeting, LogoContainer, MenuItem, SideContainer, SideMenuContainer,
} from './Sidebar.css';
import {
  useAuthContext,
} from '../../Providers/AuthContext';
import { getUserName } from '../../helpers/fnUser';
import { getMenu, MenuOptions } from '../../helpers/fnPaths';

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const { SidePaths } = getMenu(user.userType);

  if (!SidePaths) {
    return null;
  }

  const menu = Object.entries(SidePaths).map(([key, value]) => ({
    path: value,
    name: MenuOptions[key],
  }));

  return (
    <SideContainer>
      <LogoContainer />
      <Greeting>{`Hey there, ${getUserName(user)?.toUpperCase()}`}</Greeting>
      <SideMenuContainer>
        <ul>
          {menu.map((item) => (
            <Link to={item.path} key={`menu-${item.path}-${item.name}`}>
              <MenuItem>{item.name}</MenuItem>
            </Link>
          ))}
        </ul>
      </SideMenuContainer>
    </SideContainer>
  );
};

export default Navbar;
