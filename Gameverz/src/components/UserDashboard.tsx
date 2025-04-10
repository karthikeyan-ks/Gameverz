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
import CardContent from '@mui/material/CardContent';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import {
  listItem, darkTheme, Sidebar, Logo, MainContent, SectionCard, GameItem
} from '../style/dashboard_style';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import GameSwiper from './SwiperImage';
import EventsForYou from './similarEvent';

interface Game {
  pk: number;
  fields: {
    name: string;
    image: string;
    description: string;
    date_of_join: string;
    created_by: number;
  };
  model: string;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;
const imageURL = import.meta.env.VITE_API_IMAGE_URL;

export default function Gameverz() {
  const location = useLocation();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const user = location.state?.user || {
    display_name: 'Player',
    email: 'player@example.com',
    user_id: '12345',
    photo_url: '/api/placeholder/150/150',
  };

  const performanceData = [
    { name: 'Valorant', performance: 50 },
    { name: 'PUBG', performance: 50 },
    { name: 'Fortnite', performance: 50 }
  ];

  useEffect(() => {
    axios.post(`${baseURL}/gamer/dashboard/`, {}, {
      withCredentials: true,
    }).then(response => {
      if (response.data.status === 'success') {
        const cleaned = JSON.parse(response.data.message);
        const selected = response.data.selected_game_ids;
        const selectedGames = cleaned.filter((game: any) => selected.includes(game.pk));
        setGames(selectedGames);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default' }}>
        <CssBaseline />
        <Sidebar>
          <Logo>
            <img src={image} alt="Gameverz Logo" style={{ width: 50, height: 50 }} />
          </Logo>
          <ListItem>
            <Typography sx={listItem}>Dashboard</Typography>
            <IconButton>
              <ArrowBackIcon sx={{ color: 'primary.main' }} />
            </IconButton>
          </ListItem>
          <List>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <DashboardIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText primary="User Dashboard" primaryTypographyProps={{ variant: 'body2', sx: { fontSize: '0.85rem', color: 'text.primary' } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 1 }} onClick={() => navigate("/allGame")}> 
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <SportsEsportsIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText primary="All Games" primaryTypographyProps={{ variant: 'body2', sx: { fontSize: '0.85rem', color: 'text.primary' } }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Sidebar>

        <MainContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", gap: "20px", mb: 3 }}>
            <IconButton sx={{ backgroundColor: 'primary.dark' }}>
              <PersonIcon sx={{ color: 'primary.main' }} />
            </IconButton>
            <Typography variant="h5" sx={{ color: 'text.primary' }}>{user.email.split('@')[0]}</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <SectionCard>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: "center", p: 2, position: 'relative' }}>
                    <Avatar src={user.photo_url} alt={user.display_name} sx={{ width: 80, height: 80, border: '3px solid', borderColor: 'primary.main' }} />
                    <IconButton size="small" sx={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: 'primary.main', p: 0.5 }}>
                      <SportsEsportsIcon sx={{ fontSize: 16, color: '#000' }} />
                    </IconButton>
                    <Typography sx={{ width: "100%", color: 'text.primary' }}>name: {user.display_name}</Typography>
                    <Typography sx={{ width: "100%", color: 'text.secondary' }}>email: {user.email}</Typography>
                  </Box>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={9}>
              <SectionCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Configured Games</Typography>
                  <List sx={{ p: 0 }}>
                    {games.map((game, index) => (
                      <GameItem key={index}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <img src={`${imageURL}/media/${game.fields.image}`} alt={game.fields.name} style={{ width: '24px', height: '24px', objectFit: 'cover' }} />
                        </ListItemIcon>
                        <ListItemText primary={game.fields.name} primaryTypographyProps={{ sx: { color: 'text.primary' } }} />
                        <ListItemText primary={game.fields.date_of_join} primaryTypographyProps={{ sx: { color: 'text.secondary' } }} />
                        <CheckCircleIcon sx={{ color: 'primary.main' }} />
                      </GameItem>
                    ))}
                  </List>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>Achievements</Typography>
                  <List sx={{ p: 0 }}>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <EmojiEventsIcon sx={{ color: '#FFD700' }} />
                      </ListItemIcon>
                      <ListItemText primary="Top 1% in Valorant" primaryTypographyProps={{ sx: { fontSize: '0.85rem', color: 'text.primary' } }} />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <EmojiEventsIcon sx={{ color: '#C0C0C0' }} />
                      </ListItemIcon>
                      <ListItemText primary="200+ PUBG matches completed" primaryTypographyProps={{ sx: { fontSize: '0.85rem', color: 'text.primary' } }} />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <EmojiEventsIcon sx={{ color: '#CD7F32' }} />
                      </ListItemIcon>
                      <ListItemText primary="Fortnite Season Champ" primaryTypographyProps={{ sx: { fontSize: '0.85rem', color: 'text.primary' } }} />
                    </ListItem>
                  </List>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>Performance</Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={performanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis domain={[0, 100]} stroke="#aaa" />
                      <Tooltip contentStyle={{ backgroundColor: '#0D2231', borderColor: '#0ff' }} labelStyle={{ color: '#0ff' }} itemStyle={{ color: '#fff' }} />
                      <Line type="monotone" dataKey="performance" stroke="#0ff" strokeWidth={3} dot={{ r: 5, stroke: '#0ff', strokeWidth: 2, fill: '#000' }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </SectionCard>
            </Grid>

            <Container sx={{ m: 2 }}>
              <GameSwiper />
            </Container>

            <Grid item xs={12}>
              <SectionCard>
              <Typography variant="h6" sx={{ mb: 2,m:1, textAlign:"center", color: 'text.primary' }}>Events for you</Typography>
                <EventsForYou/>
              </SectionCard>
            </Grid>
          </Grid>
        </MainContent>
      </Box>
    </ThemeProvider>
  );
}