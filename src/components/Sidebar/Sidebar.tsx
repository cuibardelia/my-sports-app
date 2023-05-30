import * as React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, styled, Typography,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Providers/AuthContext';
import {
  getMenu, getSideMenu,
} from '../../helpers/fnPaths';
import { getUserName } from '../../helpers/fnUser';
import IconPicker from '../Icons/IconPicker';
import { LogoContainer } from './Sidebar.css';
import { StyledIconButton } from '../Icons/Icons.css';

const drawerWidth = 240;

const Root = styled('div')({
  display: 'flex',
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

// TODO
const Toolbar = styled('div')(({ theme }) => theme.mixins.toolbar);

const Sidebar = () => {
  const { user } = useAuthContext();
  const theme = useTheme();
  const list = getSideMenu(user.userType);

  if (!list) {
    return null;
  }

  const menu = getMenu(list);

  return (
    <Root>
      <StyledDrawer variant="permanent" anchor="left">
        <Toolbar />
        <LogoContainer />
        <Typography variant="h6" align="center" gutterBottom style={{ color: theme.palette.primary.main }}>
          {`Hey there, ${getUserName(user)?.toUpperCase()}`}
        </Typography>
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
      </StyledDrawer>
    </Root>
  );
};

export default Sidebar;
