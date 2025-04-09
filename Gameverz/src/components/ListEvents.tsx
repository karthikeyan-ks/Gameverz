import  { useEffect, useState } from 'react';
import {
    Box, Button, Container, Typography, Grid, 
    Card,
    CardMedia,
    CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
type EventType = {
    id: number;
    name: string;
    game: string;
    created_by: number;   // should be number, not string
    amount: string;
    image?: string;
    created_at: string;
    updated_at: string;
};


const baseURL = import.meta.env.VITE_API_BASE_URL;
const imageURL = import.meta.env.VITE_API_IMAGE_URL;

export const ListEvents = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const navigate = useNavigate()
    const fetchEvents = async () => {
        const res = await fetch(`${baseURL}/gamer/list/`, { credentials: "include", method: "post" });
        const data = await res.json();
        if (data.status === "success") {
            console.log(data.message)
            const list = Array()
            const response = JSON.parse(data.message)
            console.log(response);

            response.forEach((element: any) => {
                console.log(element.fields);
                element.fields['id'] = element.pk
                list.push(element.fields)
            });
            setEvents(list);
        }
    };

    

    useEffect(() => {
        fetchEvents();
    }, []);
    useEffect(()=>{
        console.log(events);
        
    },[events])


    const handleDelete = async (eventId: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this event?');
        if (!confirmed) return;
      
        try {
          const response = await fetch(`${baseURL}/gamer/delete/${eventId}/`, {
            method: 'POST',
            credentials:"include",
          });
      
          if (response.ok) {
            // Reload events list after successful deletion
            fetchEvents(); // Replace this with your own data refresh logic
          } else {
            console.error('Delete failed:', response.status);
            alert('Failed to delete event.');
          }
        } catch (error) {
          console.error('Error deleting event:', error);
          alert('Something went wrong while deleting.');
        }
      };
      
    

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" my={3}>
                <Typography variant="h5">Event List</Typography>
                <Button variant="contained" color="primary" onClick={() => {
                    navigate("addEvent")
                }}>
                    Create New Event
                </Button>
            </Box>

            <Grid container spacing={2}>
                
                {events?.length > 0 && events.map((event) => (
                    <Grid item xs={12} md={6} lg={4} key={event.id}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                      {event.image && (
                        <CardMedia
                          component="img"
                          height="180"
                          image={`${imageURL}/media/${event.image}`}
                          alt={event.name}
                          sx={{ objectFit: 'cover' }}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {event.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Game: {event.game}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Amount: ₹{event.amount}
                        </Typography>
                  
                        <Box mt={2} display="flex" justifyContent="space-between" gap={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => navigate('addevent', { state: { event } })}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            onClick={() => handleDelete(event.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>                  
                  
                ))}

            </Grid>

        </Container>
    );
};
