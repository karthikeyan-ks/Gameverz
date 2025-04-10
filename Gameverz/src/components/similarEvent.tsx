import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
type Event = {
    id: number;
    name: string;
    game: string;
    amount: string;
    image: string | null;
    created_by: string;
    created_at: string;
  };
  
const baseURL = import.meta.env.VITE_API_BASE_URL;
const imageURL = import.meta.env.VITE_API_IMAGE_URL;

const EventsForYou = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/games/events/foryou/`,
        {},
        {
          withCredentials:true
        }
      );
      console.log(response.data);
      
      setEvents(response.data.events);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {events.map(event => (
        <Grid item xs={12} m={2} sm={6} md={4} key={event.id}>
          <Card>
            {event.image && (
              <CardMedia
                component="img"
                height="140"
                image={`${imageURL}${event.image}`}
                alt={event.name}
              />
            )}
            <CardContent>
              <Typography variant="h6">{event.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Game: {event.game}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fee: ₹{event.amount}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Created by: {event.created_by}
              </Typography>
            </CardContent>
            <Button>
                Apply
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsForYou;
