import React, { useState } from 'react';
import { 
  Box, 


} from '@mui/material';
import Drawers from '../components/Drawers';


export default function GameAdminDashboard() {



  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar / Drawer */}
   

      {/* Main content */}
      
       <Drawers />
       
      
    </Box>
  );
}