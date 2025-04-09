import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Box,
  Typography,
  TextField,
  Button,
  Toolbar,
  Autocomplete,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Drawers from '../components/Drawers';
import { styled } from '@mui/material/styles';

const UploadBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F5F5F5',
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 120,
  border: '2px dashed #ccc'
}));



export default function Addevent() {

  const location = useLocation();
  const eventData = location.state?.event || null;
  const [eventName, setEventName] = useState('');
  const [game, setGame] = useState('');
  const [amount, setAmount] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [gameList, setGameList] = useState<string[]>([]);
  const [eventId, setEventId] = useState<number | null>(null); // used for update/delete

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const imageURL = import.meta.env.VITE_API_IMAGE_URL;
  // Fetch games on mount
  useEffect(() => {
    console.log(game)
    console.log(document.cookie);
    const fetchGames = async () => {
      try {
        const response = await fetch(`${baseURL}/games/${game}/`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();

        const gamelist = JSON.parse(data['message'])
        console.log(gamelist)
        const formatted = Array()
        gamelist.forEach((element: any) => {
          formatted.push({
            label: element.fields.name,
            value: element.pk,
          });
        });
        console.log(formatted)
        setGameList((prev) => [...prev, ...formatted]);
      } catch (err) {
        console.error('Failed to load games', err);
      }
    };

    fetchGames();
  }, [game]);

  useEffect(() => {
    if (eventData) {
      setEventName(eventData.name || '');
      setGame(eventData.game || '');
      setAmount(eventData.amount?.toString() || '');
      setEventId(eventData.id || null);
    }
  }, [eventData]);


  useEffect(() => {
    console.log('GameList', gameList)
  }, [gameList])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const clearForm = () => {
    setEventName('');
    setGame('');
    setAmount('');
    setThumbnail(null);
    setEventId(null);
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('game', game);
    formData.append('amount', amount);
    if (thumbnail) {
      formData.append('image', thumbnail);
    }

    const response = await fetch(`${baseURL}/gamer/create/`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      alert('Event added!');
      clearForm();
    } else {
      alert('Failed to add event');
    }
  };

  const handleUpdate = async () => {
    if (!eventId) {
      alert("Please set the event ID to update.");
      return;
    }

    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('game', game);
    formData.append('amount', amount);
    console.log(eventName,game,amount);
    
    if (thumbnail) {
      formData.append('image', thumbnail);
    }

    const response = await fetch(`${baseURL}/gamer/update/${eventId}/`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      alert('Event updated!');
      clearForm();
    } else {
      alert('Failed to update event');
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Drawers />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            p: 4,
            boxShadow: 1,
            width: '100%',
            maxWidth: '900px',
            margin: 'auto',
          }}
        >
          <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 600 }}>
            Manage Event
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography fontWeight={600} mb={1}>Event Name</Typography>
              <TextField
                fullWidth
                name="name"
                variant="filled"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Box>

            <Box>
              <Typography fontWeight={600} mb={1}>Game</Typography>
              <Autocomplete
                options={gameList}
                freeSolo
                value={game}
                inputValue={game}
                onInputChange={(e, newInputValue, reason) => {
                  setGame(newInputValue);
                  setGameList([])

                  if (newInputValue === '') {
                    setGameList([]); // clear game list when input is cleared
                  }
                }}
                onChange={(e, val) => {
                  setGame(val || '');
                }}
                renderInput={(params) => (
                  <TextField name="game" {...params} fullWidth variant="filled" />
                )}
              />

            </Box>

            <Box>
              <Typography fontWeight={600} mb={1}>Registration Amount</Typography>
              <TextField
                fullWidth
                variant="filled"
                name="amount"
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Box>

            <Box>
              <Typography fontWeight={600} mb={1}>Thumbnail</Typography>
              <label htmlFor="upload-thumbnail">
                <UploadBox>
                  <UploadFileIcon fontSize="large" />
                </UploadBox>
              </label>
              <input
                name="upload-thumbnail"
                id="upload-thumbnail"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {/* Show uploaded file name or existing image */}
              {thumbnail ? (
                <Typography variant="caption" sx={{ mt: 1 }}>
                  Selected: {thumbnail.name}
                </Typography>
              ) : eventData?.image ? (
                <Box mt={2}>
                  <Typography variant="caption">Current Thumbnail:</Typography>
                  <Box
                    component="img"
                    src={`${imageURL}/media/${eventData.image}`}
                    alt="Event Thumbnail"
                    sx={{ width: '100%', maxWidth: '300px', borderRadius: 2, mt: 1 }}
                  />
                </Box>
              ) : null}
            </Box>
          </Box>

          <Box textAlign="center" mt={4} display="flex" gap={2} justifyContent="center">
            {!eventData ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', color: 'white', px: 4 }}
                onClick={handleAdd}
              >
                Add Event
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#1976d2', color: 'white', px: 4 }}
                  onClick={handleUpdate}
                >
                  Update Event
                </Button>
              </>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
