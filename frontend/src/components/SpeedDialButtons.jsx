import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { Search, BarChart, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';


const SpeedDialButtons = ({ setOpen }) => {
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
      <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />}>
        {actions.map((action) => <SpeedDialAction key={action.name} icon={action.icon} onClick={action.onClick} />)}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialButtons;