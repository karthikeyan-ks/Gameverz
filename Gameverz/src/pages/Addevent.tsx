import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Toolbar,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Drawers from '../components/Drawers';
import { styled } from '@mui/material/styles';

const UploadBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F5F5F5', // lighter white-ish grey for dropzone
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
  const [eventName, setEventName] = useState('');
  const [game, setGame] = useState('');
  const [amount, setAmount] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log({ eventName, game, amount, thumbnail });
    alert('Event added!');
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawers />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, backgroundColor: '#FFFFFF' }}>
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
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 3,
              backgroundColor: '#F0F0F0',
              borderRadius: 2,
              py: 1,
              color: 'black',
              fontWeight: 600,
            }}
          >
            Add event
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography fontWeight={600} color="black" mb={1}>
                Event Name
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                inputProps={{ style: { color: 'black' } }}
              />
            </Box>

            <Box>
              <Typography fontWeight={600} color="black" mb={1}>
                Game
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                inputProps={{ style: { color: 'black' } }}
              />
            </Box>

            <Box>
              <Typography fontWeight={600} color="black" mb={1}>
                Registration Amount
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputProps={{ style: { color: 'black' } }}
              />
            </Box>

            <Box>
              <Typography fontWeight={600} color="black" mb={1}>
                Thumbnail
              </Typography>
              <label htmlFor="upload-thumbnail">
                <UploadBox>
                  <UploadFileIcon fontSize="large" sx={{ color: 'black' }} />
                </UploadBox>
              </label>
              <input
                id="upload-thumbnail"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {thumbnail && (
                <Typography variant="caption" sx={{ mt: 1, color: 'black' }}>
                  Selected: {thumbnail.name}
                </Typography>
              )}
            </Box>
          </Box>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'black', color: 'white', px: 4, borderRadius: 2 }}
              onClick={handleSubmit}
            >
              Add event
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
