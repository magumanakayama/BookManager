import { Box, Button, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';
import { Search, BarChart, Add } from '@mui/icons-material';

const Header = ({ sort, setSort, setSubmitModalOpen }) => {
  const navigate = useNavigate();
  const handleSearch = () => navigate(`${BASE_URL}/BookSearch`);
  const handleGraph = () => navigate(`${BASE_URL}/BookGraph`);

  const control = {
    value: sort,
    onChange: (_, newValue) => {
      if (newValue === null) return;
      setSort(newValue)
    },
    exclusive: true,
  };

  return (
    <Stack direction="row" sx={{ position: 'fixed', justifyContent: 'space-between', alignItems: 'center', width: '100%', top: 0, left: 0, zIndex: 1100, backgroundColor: '#555555' }}>
      <Button variant="contained" onClick={handleGraph} sx={{ m: 2 }}><BarChart /></Button>
      <ToggleButtonGroup size='small' {...control} aria-label="Small sizes" sx={{ bgcolor: '#e0e0e065' }}>
        <ToggleButton value="new">新しい順</ToggleButton>
        <ToggleButton value="old">古い順</ToggleButton>
      </ToggleButtonGroup>
      <Box>
        <Button variant="contained" onClick={() => setSubmitModalOpen(true)}><Add /></Button>
        <Button variant="contained" onClick={handleSearch} sx={{ m: 2 }}><Search /></Button>
      </Box>
    </Stack >
  );
};

export default Header;