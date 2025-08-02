import { useState } from 'react'
import { Button, Modal, Box, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import './App.css'

function App() {
  const [open, setOpen] = useState(false)
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    date: '',
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: theme.palette.primary.dark,
    width: 800,
    height: 450,
    p: 4,
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    localStorage.setItem('title', bookInfo.title);
    localStorage.setItem('author', bookInfo.author);
    localStorage.setItem('date', bookInfo.date);
    handleClose();
  }
  const handleInput = (e, param) => setBookInfo({ ...bookInfo, [param]: e.target.value });


  const localTitle = localStorage.getItem('title');
  const localAuthor = localStorage.getItem('author');
  const localDate = localStorage.getItem('date');
  const rows = [{ id: 1, title: localTitle, author: localAuthor, date: localDate }];
  const columns = [{ field: 'title', headerName: 'タイトル' }, { field: 'author', headerName: '著者' }, { field: 'date', headerName: '読み終わった日' }];



  return (
    <ThemeProvider theme={theme}>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      <Button variant="contained" onClick={handleOpen}>書籍登録</Button>


      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField label="タイトル" variant="outlined" value={bookInfo.title} onChange={e => handleInput(e, 'title')} />
          <TextField label="著者" variant="outlined" value={bookInfo.author} onChange={e => handleInput(e, 'author')} />
          <TextField label="読み終わった日" variant="outlined" value={bookInfo.date} onChange={e => handleInput(e, 'date')} />
          <Button variant="contained" onClick={handleClose}>閉じる</Button>
          <Button variant="contained" onClick={handleSubmit}>登録</Button>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}

export default App
