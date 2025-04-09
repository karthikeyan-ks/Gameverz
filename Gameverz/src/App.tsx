import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import UserDashboard from './components/UserDashboard';
import CreateAccount from './components/CreateAccount';
import LoginOptions from './components/LoginOptions';
import GameverzLanding from './components/GameverzLanding';
import Signup from './pages/signup';
import GameAdminDashboard from './pages/GameAdminDashboard';
import AddEventPage from './pages/Addevent';
import Addevent from './pages/Addevent';
import { ListEvents } from './components/ListEvents';
import GameList from './pages/allgame';


// Dark theme (default)
const darkTheme = createTheme({
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

// Light theme override for certain pages
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<GameverzLanding />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<LoginOptions />} />
          <Route path="/gameverz" element={<UserDashboard />} />
          <Route path="/signup" element={<Signup />} />

          {/* Nested routes under /gameAdmin */}
          <Route
            path="/gameAdmin"
            element={
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <GameAdminDashboard />
              </ThemeProvider>
            }
          >
            <Route path="" element={<ListEvents/>}/>
            <Route path="addevent" element={<Addevent />} /> {/* ✅ FIXED HERE */}
          </Route>

          <Route
            path="/AddEventPage"
            element={
              <AddEventPage />
            }
          />
          <Route path='/allGame' element={
            <ThemeProvider theme={darkTheme}>
              <CssBaseline/>
              <GameList/>
            </ThemeProvider>
          } />
        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;
