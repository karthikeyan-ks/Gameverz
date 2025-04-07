import image from '../assets/image.png'
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {listItem,darkTheme,Sidebar,Logo,MainContent,SectionCard,GameItem} from '../style/dashboard_style'



export default function Gameverz() {
  const location = useLocation();
  const user = location.state?.user || {
    display_name: 'Player',
    email: 'player@example.com',
    user_id: '12345',
    photo_url: '/api/placeholder/150/150',
  };
  console.log(user)

  const games = [
    { name: 'Valorant', icon: <SportsEsportsIcon /> },
    { name: 'PUBG', icon: <SportsEsportsIcon /> },
    { name: 'Fortnite', icon: <SportsEsportsIcon /> },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar>
          <Logo>
            <img
              src={image}
              alt="Gameverz Logo"
              style={{ width: 50, height: 50 }}
            />
          </Logo>
          <ListItem>
            <Typography sx={listItem}>
              Dashboard
            </Typography>
            <IconButton >

              <ArrowBackIcon />
            </IconButton>
          </ListItem>

          <List>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <DashboardIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Dashboard"
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { fontSize: '0.8rem' }
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <SportsEsportsIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText
                  primary="All Games"
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { fontSize: '0.8rem' }
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ mt: 'auto', mb: 2 }}>
            <Paper
              sx={{
                backgroundColor: '#0D2231',
                height: 100,
                width: '100%'
              }}
            />
          </Box>
        </Sidebar>

        <MainContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end',alignItems:"center",gap:"20px", mb: 3 }}>
            <IconButton sx={{ backgroundColor: '#10172A' }}>
              <PersonIcon />
            </IconButton>
            <Typography variant="h5" sx={{ textAlign:"center",height:"100%" }}>{user.email.split('@')[0]}</Typography>
          </Box>

          <Grid container spacing={3}>
            {/* User Profile Section */}
            <Grid item xs={12} md={3}>
              <SectionCard className="blueAccent">
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 2,
                      position: 'relative'
                    }}
                  >
                    <Avatar
                      src={`${user.photo_url}`}
                      alt={user.display_name}
                      sx={{
                        width: 80,
                        height: 80,
                        border: '3px solid #10172A',
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: '#0ff',
                        p: 0.5
                      }}
                    >
                      <SportsEsportsIcon sx={{ fontSize: 16, color: '#000' }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </SectionCard>
            </Grid>

            {/* Configured Games Section */}
            <Grid item xs={12} md={9}>
              <SectionCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Configured Games
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {games.map((game, index) => (
                      <GameItem key={index}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          {game.icon}
                        </ListItemIcon>
                        <ListItemText primary={game.name} />
                        <CheckCircleIcon sx={{ color: '#0ff' }} />
                      </GameItem>
                    ))}
                  </List>
                </CardContent>
              </SectionCard>
            </Grid>

            {/* Achievements Section */}
            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Achievements
                  </Typography>
                  <Box sx={{ height: 80 }} /> {/* Placeholder for achievements content */}
                </CardContent>
              </SectionCard>
            </Grid>

            {/* Performance Section */}
            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Performance
                  </Typography>
                  <Box sx={{ height: 80 }} /> {/* Placeholder for performance content */}
                </CardContent>
              </SectionCard>
            </Grid>

            {/* Bottom Section - could be for stats or friends */}
            <Grid item xs={12}>
              <SectionCard>
                <CardContent>
                  <Box sx={{ height: 100 }} /> {/* Placeholder for bottom section content */}
                </CardContent>
              </SectionCard>
            </Grid>
          </Grid>
        </MainContent>
      </Box>
    </ThemeProvider>
  );
}