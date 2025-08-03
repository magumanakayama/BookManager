import { Button, Box } from '@mui/material'
import Typography from '@mui/material/Typography';


const Header = ({ setOpen, setInputBooks }) => {

  const handleOpen = () => {
    setOpen(true);
    const mmdd = `${String(new Date().getMonth() + 1)}/${String(new Date().getDate())}`;
    setInputBooks({ title: '', author: '', date: mmdd });
  };

  return (
    <Box sx={{ display: 'flex', position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 1100, backgroundColor: '#555555' }}>
      <Typography variant="h5" sx={{ m: 2 }}>
        書籍管理アプリ
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleOpen} sx={{ m: 2 }}>書籍登録</Button>
    </Box>
  );
}

export default Header;