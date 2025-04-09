import { Box } from '@mui/material';
import Drawers from '../components/Drawers';
import { Outlet } from 'react-router-dom';

export default function GameAdminDashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar / Drawer */}
      <Drawers />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
