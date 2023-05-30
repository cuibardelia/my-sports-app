import * as React from 'react';
import { styled } from '@mui/system';
import { Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {
  AdminMenu, getMenu,
} from '../../helpers/fnPaths';
import { TransparentAppBar } from './Navbar.css';
import { LogoSmall } from '../Sidebar/Sidebar.css';
import { useAuthContext } from '../../Providers/AuthContext';
import { StyledIconButton } from '../Icons/Icons.css';

const RightAlignedLinks = styled('div')({
  marginLeft: 'auto',
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginRight: theme.spacing(2),
  textDecoration: 'none',
}));

const Navbar: React.FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const menu = getMenu(AdminMenu);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <TransparentAppBar position="static">
      <Toolbar>
        <LogoSmall />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <RightAlignedLinks>
          {menu.map((menuItem) => (
            <StyledLink key={menuItem.name} to={menuItem.path}>
              {menuItem.name}
            </StyledLink>
          ))}
          <StyledIconButton edge="end" onClick={handleLogout}>
            <PowerSettingsNewIcon />
          </StyledIconButton>
        </RightAlignedLinks>
      </Toolbar>
    </TransparentAppBar>
  );
};

export default Navbar;
