import { Box, Card, ListItem } from '@mui/material';
import { styled, createTheme } from '@mui/material/styles';

export const listItem = {
    color:"gold"
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
  
 export const Sidebar = styled(Box)(({ theme }) => ({
    width: 180,
    height: '100vh',
    backgroundColor: '#050914',
    position: 'fixed',
    left: 0,
    top: 0,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  }));
  
 export const MainContent = styled(Box)(({ theme }) => ({
    marginLeft: 130,
    padding: theme.spacing(3),
    width: 'calc(100% - 130px)',
    minHeight: '100vh',
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
  