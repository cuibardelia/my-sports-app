import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuItem, NavContainer } from './Navbar.css';
import { useAuthContext } from '../../Providers/AuthContext';
import { getMenu, MenuOptions } from '../../helpers/fnPaths';

const Navbar: React.FC = () => {
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  const { logout, user } = useAuthContext();
  const { TopPaths } = getMenu(user.userType);
  // FIXME
  // const hasLogOut = hasLogout(user.userType);
  const hasLogOut = true;

  if (!TopPaths && !hasLogOut) {
    return null;
  }

  let menu = [];
  if (TopPaths) {
    menu = Object.entries(TopPaths)?.map(([key, value]) => ({
      path: value,
      name: MenuOptions[key],
    }));
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // TODO: tabindex for accessibility
  return (
    <NavContainer>
      <ul>
        {menu?.map((item) => (
          <Link to={item.path} key={`menu-${item.name}`}>
            <MenuItem>{item.name}</MenuItem>
          </Link>
        ))}
        { hasLogOut && (
        <MenuItem
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
        )}
      </ul>
    </NavContainer>
  );
};

export default Navbar;
