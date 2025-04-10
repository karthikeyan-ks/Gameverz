import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, List, ListItem, ListItemText, Divider,
  Paper, Checkbox, TextField
} from '@mui/material';

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

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGames, setSelectedGames] = useState<Set<number>>(new Set());

  const fetchGames = async () => {
    try {
      const response = await axios.post(`${baseURL}/gamer/dashboard/`, {}, {
        withCredentials: true,
      });

      const games = response.data;
      const cleaned = JSON.parse(games.message);
      setLoading(false);
      setGames(cleaned);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleCheckboxChange = (pk: number) => {
    setSelectedGames(prev => {
      const newSet = new Set(prev);
      newSet.has(pk) ? newSet.delete(pk) : newSet.add(pk);
      return newSet;
    });
  };

  const filteredGames = games.filter(game =>
    game.fields.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Game List
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          my: 2,
          backgroundColor: '#fff', // light background
          input: {
            color: '#000', // input text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc', // optional border styling
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#888', // placeholder color
          },
        }}
      />

      {loading ? (
        <Typography>Loading games...</Typography>
      ) : (
        <Paper>
          <List>
            {filteredGames.map((game) => (
              <React.Fragment key={game.pk}>
                <ListItem alignItems="flex-start" secondaryAction={
                  <Checkbox
                    checked={selectedGames.has(game.pk)}
                    onChange={() => handleCheckboxChange(game.pk)}
                  />
                }>
                  <ListItemText
                    primary={`${game.fields.name} (${game.fields.date_of_join})`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {game.fields.description}
                        </Typography>
                        <br />
                        Genre: {game.fields.genre.map(g => g.name).join(', ')}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default GameList;
