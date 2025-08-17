import { Button, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';

const Header = () => {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`${BASE_URL}/BookSearch`);
  };


  return (
    <Box sx={{ display: 'flex', position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 1100, backgroundColor: '#555555' }}>
      <Typography variant="h5" sx={{ m: 2 }}>
        書籍管理アプリ
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleSearch} sx={{ m: 2 }}>書籍検索</Button>
    </Box>
  );
};

export default Header;