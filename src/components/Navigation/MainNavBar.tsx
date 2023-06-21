import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import { styled } from '@mui/system';
import { useAuthContext } from '../../Providers/AuthContext';
import { UserType } from '../types/User';
import { StyledIconButton } from '../Icons/Icons.css';
import { TransparentAppBar } from './Navbar.css';
import { FeaturePaths } from '../../helpers/fnPaths';
import { UserAvatar } from '../Pics/MainAvatar';

const StyledNavIcon = styled(StyledIconButton)`
 margin-right: 0.3rem;
`;

const NavUserAvatar = styled(UserAvatar)`
  width: 3.3rem;
  height: 3.3rem;
`;

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
        { user.userType === UserType.CLIENT && (
        <StyledNavIcon onClick={goToSettings}>
          <SettingsIcon />
        </StyledNavIcon>
        )}
        <StyledNavIcon onClick={handleLogout}>
          <PowerSettingsNewIcon />
        </StyledNavIcon>
        <NavUserAvatar alt="My Profile" src={user.picUrl} onClick={goToProfile} />
      </Toolbar>
    </TransparentAppBar>

  );
};

export default MainNavbar;
