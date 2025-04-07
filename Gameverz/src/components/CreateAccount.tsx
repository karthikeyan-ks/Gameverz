
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button 
} from '@mui/material';
import { useState } from 'react';

function CreateAccount() {
  const [gamerName, setGamerName] = useState('');

  return (
    <Card sx={{ width: 400, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Create Account
        </Typography>
        <TextField
          fullWidth
          label="Gamer Name"
          variant="outlined"
          value={gamerName}
          onChange={(e) => setGamerName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button 
          fullWidth 
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </CardContent>
    </Card>
  );
}

export default CreateAccount;
