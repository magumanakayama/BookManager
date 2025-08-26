import { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Search, BarChart, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';


const SpeedDialButtons = ({ setOpen }) => {
  const [dialOpen, setDialOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearch = () => navigate(`${BASE_URL}/BookSearch`);
  const handleGraph = () => navigate(`${BASE_URL}/BookGraph`);

  const actions = [
    { icon: <Search />, name: 'Search', onClick: handleSearch },
    { icon: <BarChart />, name: 'Graph', onClick: handleGraph },
    { icon: <Add />, name: 'Add', onClick: () => setOpen(true) },
  ];


  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <SpeedDial ariaLabel="SpeedDial" open={dialOpen} onOpen={() => setDialOpen(true)} onClose={() => setDialOpen(false)} icon={<SpeedDialIcon />}>
        {actions.map((action) => <SpeedDialAction key={action.name} icon={action.icon} onClick={action.onClick} />)}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialButtons;