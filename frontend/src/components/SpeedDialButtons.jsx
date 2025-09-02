import { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Search, BarChart, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import generateTodayString from '../generateTodayString';


const SpeedDialButtons = ({ setOpen, setInputBooks }) => {
  const [dialOpen, setDialOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearch = () => navigate(`${BASE_URL}/BookSearch`);
  const handleGraph = () => navigate(`${BASE_URL}/BookGraph`);
  const handleAdd = () => {
    setInputBooks({ title: '', author: '', date: generateTodayString() });
    setOpen(true);
  }

  const actions = [
    { icon: <Search />, name: 'Search', onClick: handleSearch },
    { icon: <BarChart />, name: 'Graph', onClick: handleGraph },
    { icon: <Add />, name: 'Add', onClick: handleAdd },
  ];


  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <SpeedDial ariaLabel="SpeedDial" open={dialOpen} onClick={() => setDialOpen(!dialOpen)} icon={<SpeedDialIcon />}>
        {actions.map((action) => <SpeedDialAction key={action.name} icon={action.icon} onClick={action.onClick} />)}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialButtons;