
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import UserDashboard from './components/UserDashboard';
import CreateAccount from './components/CreateAccount';
import LoginOptions from './components/LoginOptions';
import GameverzLanding from './components/GameverzLanding';
import Signup from './pages/signup';
import { GameAdminDashboard } from './pages/GameAdminDashboard';

// Custom dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0A1A',
      paper: '#121228'
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121228',
          borderColor: '#2A2A4A',
          borderWidth: '1px',
          borderStyle: 'solid',
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#0A0A1A'
        }}>
          <Routes>
            <Route path="/" element={<GameverzLanding/>} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<LoginOptions />} />
            <Route path="/gameverz" element={<UserDashboard />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/gameAdmin' element={<GameAdminDashboard/>}/>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;