import * as React from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../Providers/AuthContext';
import { ConnectionPaths, getMenu, getSideMenu } from '../../helpers/fnPaths';
import { getUserName } from '../../helpers/fnUser';
import IconPicker from '../Icons/IconPicker';
import { LogoContainer } from './Sidebar.css';
import { StyledIconButton } from '../Icons/Icons.css';
import { UserType } from '../types/User';
import { useProtectedHeaders } from '../../hooks/useProtectedCall';
import MainAvatar, { HoverAvatar } from '../Pics/MainAvatar';

const drawerWidth = 220;

const Root = styled('div')({
  display: 'flex',
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  color: theme.palette.background.default,
  flexShrink: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));
const UserGreet = styled(Typography)(() => ({
  wordWrap: 'break-word',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledName = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

const MenuSectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  '&:hover': {
    color: theme.palette.secondary.light,
  },
}));

const Sidebar = () => {
  const { user } = useAuthContext();
  const list = getSideMenu(user.userType);
  const isTrainer = user.userType === UserType.TRAINER;
  const url = isTrainer ? `${process.env.TRAINER_API}/get-clients` : `${process.env.CLIENT_API}/get-personal-trainers`;
  const key = isTrainer ? 'clients' : 'users';
  const link = isTrainer ? ConnectionPaths.CLIENTS : ConnectionPaths.TRAINERS;
  const [buddies, setBuddies] = useState([]);
  const options = useProtectedHeaders();

  if (!list) {
    return null;
  }

  useEffect(() => {
    axios.get(url, options)
      .then((response) => {
        setBuddies(response.data[key]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const menu = getMenu(list);
  const buddiesName = isTrainer ? 'CLIENTS' : 'TRAINERS';
  const ellipsisAvatars = buddies?.length > 3 ? buddies.slice(4) : [];
  const displayedAvatars = buddies?.slice(0, 3) || [];

  return (
    <Root>
      <StyledDrawer variant="permanent" anchor="left">
        <LogoContainer />
        <UserGreet variant="h6" align="center" gutterBottom>
          Hey there,
          {' '}
          <StyledName component="span">
            {getUserName(user)?.toUpperCase()}
          </StyledName>
        </UserGreet>
        <List>
          {menu.map((item) => (
            <ListItem button component={Link} to={item.path} key={`menu-${item.path}-${item.name}`}>
              <ListItemIcon>
                <StyledIconButton>
                  <IconPicker path={item.path} />
                </StyledIconButton>
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Link to={link} style={{ textDecoration: 'none' }}>
          <List>
            <ListItem>
              <MenuSectionTitle variant="subtitle1" gutterBottom>
                {buddiesName}
              </MenuSectionTitle>
            </ListItem>
            <ListItem>
              {displayedAvatars?.map((client, index) => (
                <MainAvatar user={client} key={`avatar-${index}`} />
              ))}
              {ellipsisAvatars.length > 0 && (
                <HoverAvatar>
                  +
                  {ellipsisAvatars.length}
                </HoverAvatar>
              )}
            </ListItem>
          </List>
        </Link>
      </StyledDrawer>
    </Root>
  );
};

export default Sidebar;
