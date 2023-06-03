import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toolbar, Avatar } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import { useAuthContext } from '../../Providers/AuthContext';
import { UserType } from '../types/User';
import { StyledIconButton } from '../Icons/Icons.css';
import { TransparentAppBar } from './Navbar.css';
import { FeaturePaths } from '../../helpers/fnPaths';

const MainNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goToSettings = () => {
    navigate('settings');
  };

  const goToProfile = () => {
    navigate(FeaturePaths.PROFILE);
  };

  return (
    <TransparentAppBar position="static">
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <Avatar alt="My Profile" src={user.picUrl} onClick={goToProfile} />
        { user.userType === UserType.CLIENT && (
        <StyledIconButton edge="end" onClick={goToSettings}>
          <SettingsIcon />
        </StyledIconButton>
        )}
        <StyledIconButton edge="end" onClick={handleLogout}>
          <PowerSettingsNewIcon />
        </StyledIconButton>
      </Toolbar>
    </TransparentAppBar>

  );
};

export default MainNavbar;
