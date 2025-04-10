import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, List, ListItem, ListItemText, Divider,
  Paper, Checkbox, TextField,
  Container,Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define type for Genre
interface Genre {
  id: number;
  name: string;
}

// Define type for Game
type Game = {
  model: string;
  pk: number;
  fields: {
    name: string;
    description: string;
    genre: Genre[]; // assuming genre is an array of objects with id and name
    date_of_join: string;
    image: string;
    active: boolean;
    created_by: number;
  };
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

const imageURL = import.meta.env.VITE_API_IMAGE_URL;

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGames, setSelectedGames] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const fetchGames = async () => {
    try {
      const response = await axios.post(`${baseURL}/gamer/dashboard/`, {}, {
        withCredentials: true,
      });
  
      const games = response.data;
      const cleaned = JSON.parse(games.message);
      const selected = new Set<number>(games.selected_game_ids); // 👈 here we extract the selected IDs
      console.log(response.data);
      
      setGames(cleaned);
      setSelectedGames(selected); // 👈 pre-check these games
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  

  useEffect(() => {
    fetchGames();
  }, []);

  const handleCheckboxChange = (pk: number) => {
    var action = selectedGames.has(pk) ? 'remove' : 'add'
    setSelectedGames(prev => {
      const newSet = new Set(prev);
      newSet.has(pk) ? newSet.delete(pk) : newSet.add(pk);
      return newSet;
    });
    console.log(pk);
    updateSelectedGame(pk,action)

  };
  const updateSelectedGame = async (pk:number,action:string) =>{
    const response = await axios.post(`${baseURL}/games/gamer/${pk}/${action}/`, {}, {
      withCredentials: true,
    });
    console.log(response.data)
  }

  const filteredGames = games.filter(game =>
    game.fields.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{
      backgroundColor: '#0D1B2A', // dark navy blue
      minHeight: '100vh',
      py: 4,
      color: '#fff',
    }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Game List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/gameverz')}
          sx={{ mb: 2 }}
        >
          Go to Gameverz
        </Button>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            my: 2,
            backgroundColor: '#1B263B',
            borderRadius: 1,
            input: {
              color: '#fff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#415A77',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#778DA9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E0E1DD',
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#A9BCD0',
              opacity: 1,
            },
          }}
        />


        {loading ? (
          <Typography>Loading games...</Typography>
        ) : (
          <Paper sx={{ p: 2 }}>
            <List>
              {filteredGames.map((game) => (
                <React.Fragment key={game.pk}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <Checkbox
                        checked={selectedGames.has(game.pk)}
                        onChange={() => handleCheckboxChange(game.pk)}
                      />
                    }
                    sx={{
                      mb: 2, // margin bottom between items
                      borderRadius: 2,
                      backgroundColor: '#1B263B', // darker card background
                      padding: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {game.fields.image && (
                        <img
                          src={`${imageURL}/media/${game.fields.image}`}
                          alt={game.fields.name}
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: 'cover',
                            borderRadius: 8,
                          }}
                        />
                      )}
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="white">
                            {`${game.fields.name} (${game.fields.date_of_join})`}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="gray">
                              {game.fields.description}
                            </Typography>
                            <br />
                            <Typography variant="body2" color="lightgray">
                              Genre: {game.fields.genre.map((g) => g.name).join(', ')}
                            </Typography>
                          </>
                        }
                      />
                    </Box>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>

        )}
      </Container>

    </Box>
  );
};

export default GameList;
