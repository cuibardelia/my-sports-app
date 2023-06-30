import { styled } from '@mui/material/styles';
import {
  Card, LinearProgress, List, ListItem, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const DefaultLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: '1.2rem',
  textDecoration: 'none',
}));

export const SessionsTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '2rem',
}));

export const KilosTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '3rem',
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  margin: '0 auto',
  padding: theme.spacing(2),
}));

export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const LightCard = styled(Card)(({ theme }) => ({
  margin: '20px auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

export const GradientCard = styled(Card)(({ theme }) => ({
  margin: '10px auto',
  padding: theme.spacing(2),
  // @ts-ignore
  background: `linear-gradient(45deg, ${theme.palette.secondary.light}, ${theme.palette.accent.secondary})`,
  boxShadow: theme.shadows[3],
  color: theme.palette.text.disabled,
}));

export const LightTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

export const DarkGradientCard = styled(Card)(({ theme }) => ({
  margin: '10px auto',
  padding: theme.spacing(2),
  background: `linear-gradient(to right bottom, ${theme.palette.primary.dark} 45%, ${theme.palette.primary.light})`,
  boxShadow: theme.shadows[3],
  color: theme.palette.text.disabled,
}));

export const StyledCongratulations = styled(Typography)<{ isProgress: boolean }>(({ theme, isProgress }) => ({
  color: isProgress ? theme.palette.primary.dark : theme.palette.primary.main,
}));

export const StyledList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: 1,
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(0),
}));

export const StyledEmoji = styled('span')({
  fontSize: '2rem',
});
