import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TransparentAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  padding: '20px 0 0 0',
}));
