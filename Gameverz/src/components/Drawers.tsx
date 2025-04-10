
import { Link, useNavigate } from 'react-router-dom';
import {
 
  Typography,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';

const baseURL = import.meta.env.VITE_API_IMAGE_URL;
function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts.pop()?.split(';').shift();
    return result ?? '';
  }
  return '';
}


const drawerWidth = 240;
export default function Drawers() {
  
  const navigate = useNavigate()
  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#919191',
          color: 'black',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: 'rgba(0,0,0)' }} />
      <List>
      
      

      <ListItem  component={Link} to="/gameAdmin">
        <EventIcon sx={{ mr: 2 }} />
        <ListItemText primary="All event" />
      </ListItem>

      <ListItem  component={Link} to="/gameAdmin/addevent/">
        <AssessmentIcon sx={{ mr: 2 }} />
        <ListItemText primary="Add Events" />
      </ListItem>
      <ListItem  component={"button"} onClick={()=>{
        fetch(`${baseURL}/logout/`, {
          method: 'POST',
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
          credentials: 'include',
        }).then((res)=>{
          console.log(res)
          navigate('/')
        });

        
      }}>
        <EventIcon sx={{ mr: 2 }} />
        <ListItemText primary="logout" />
      </ListItem>



      </List>
    </Drawer>
  );
}