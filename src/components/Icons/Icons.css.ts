import { styled } from '@mui/material/styles';
import {
  IconButton,
} from '@mui/material';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
