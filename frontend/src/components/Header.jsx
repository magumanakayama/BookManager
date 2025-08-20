import { Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';

const Header = () => {
  const navigate = useNavigate();
  const handleSearch = () => navigate(`${BASE_URL}/BookSearch`);
  const handleGraph = () => navigate(`${BASE_URL}/BookGraph`);

  return (
    <Box sx={{ display: 'flex', position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 1100, backgroundColor: '#555555' }}>
      <Button variant="contained" onClick={handleGraph} sx={{ m: 2 }}>グラフ</Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleSearch} sx={{ m: 2 }}>書籍検索</Button>
    </Box>
  );
};

export default Header;