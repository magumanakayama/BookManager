import { useState } from 'react'
import { Button, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import './App.css'

import BookModal from './components/BookModal';
import BookTable from './components/BookTable';

function App() {
  const [open, setOpen] = useState(false)
  const [bookInfo, setBookInfo] = useState(JSON.parse(localStorage.getItem('books') || '[]'));
  const [inputBooks, setInputBooks] = useState({ title: '', author: '', date: '' });

  const handleOpen = () => {
    setOpen(true);
    const mmdd = `${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}`;
    setInputBooks({ title: '', author: '', date: mmdd });
  };
  const handlePreset = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
  }

  const modalProps = {
    open,
    setOpen,
    bookInfo,
    setBookInfo,
    inputBooks,
    setInputBooks, // デバックプリセット専用
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100%', width: 480 }}>
        <BookTable bookInfo={bookInfo} />
      </Box>

      <Button variant="contained" onClick={handleOpen}>書籍登録</Button>
      <Button variant="contained" onClick={() => handlePreset([])}>全削除</Button>
      <Button variant="contained" onClick={() => handlePreset([{ title: 'Nのために', author: '湊かなえ', date: '08/02' }, { title: 'コンビニ人間', author: '村田沙耶香', date: '08/03' }])}>デバックプリセット</Button>

      <BookModal {...modalProps} />
    </ThemeProvider >
  )
}

export default App
