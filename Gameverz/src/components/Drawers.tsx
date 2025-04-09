import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
export default function Drawers() {
  const navigate = useNavigate();
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
      
      <ListItem button onClick={() => navigate('/gameAdmin')}>
        <EventIcon sx={{ mr: 2 }} />
        <ListItemText primary="All event" />
      </ListItem>
      <ListItem button onClick={() => navigate('/AddEventPage')}>
        <AssessmentIcon sx={{ mr: 2 }} />
        <ListItemText primary="Add Events" />
      </ListItem>
     
    </List>
  </Drawer>
    );
}