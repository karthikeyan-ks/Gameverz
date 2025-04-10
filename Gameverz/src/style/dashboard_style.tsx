import { Box, Card, ListItem } from '@mui/material';
import { styled, createTheme } from '@mui/material/styles';

export const listItem = {
  color: "gold"
}

// Create dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ff',
    },
    background: {
      default: '#080E1A',
      paper: '#10172A',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
export const Sidebar = styled(Box)(({ }) => ({
  width: '240px',
  height: '100vh',
  backgroundColor: '#10172A',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed', // important to stay fixed
  left: 0,
  top: 0,
  zIndex: 1000,
}));


export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: '240px', // match this with your Sidebar's width
}));


export const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const SectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#0D1426',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  height: '100%',
  '&.blueAccent': {
    borderLeft: '4px solid #0ff',
  }
}));

export const GameItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#1A2237',
  borderRadius: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
}));
