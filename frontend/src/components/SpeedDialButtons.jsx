import { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Search, BarChart, Add, ImportExport } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';

const SpeedDialButtons = ({ setOpen, setCSVOpen }) => {
  const [dialOpen, setDialOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { icon: <Search />, name: 'Search', onClick: () => navigate(`${BASE_URL}/BookSearch`) },
    { icon: <BarChart />, name: 'Graph', onClick: () => navigate(`${BASE_URL}/BookGraph`) },
    { icon: <Add />, name: 'Add', onClick: () => setOpen(true) },
    { icon: <ImportExport />, name: 'Close', onClick: () => setCSVOpen(true) },
  ];

  return (
    <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
      <SpeedDial ariaLabel="SpeedDial" open={dialOpen} onClick={() => setDialOpen(!dialOpen)} icon={<SpeedDialIcon />}>
        {actions.map((action) => <SpeedDialAction key={action.name} icon={action.icon} onClick={action.onClick} />)}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialButtons;