import { useState } from 'react'
import { Button, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import './App.css'

import BookModal from './components/BookModal';
import BookTable from './components/BookTable';
import Header from './components/Header';

function App() {
  const [open, setOpen] = useState(false)
  const [bookInfo, setBookInfo] = useState(JSON.parse(localStorage.getItem('books')) || []);
  const [inputBooks, setInputBooks] = useState({ title: '', author: '', date: '' });

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
      <Header setOpen={setOpen} setInputBooks={setInputBooks} />

      <BookTable bookInfo={bookInfo} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
        <Button variant="contained" onClick={() => handlePreset([])}>全削除</Button>
        <Button variant="contained" onClick={() => handlePreset([{ title: 'Nのために', author: '湊かなえ', date: '8/2' }, { title: 'コンビニ人間', author: '村田沙耶香', date: '8/3' }])}>デバックプリセット</Button>
      </Box>

      <BookModal {...modalProps} />
    </ThemeProvider >
  )
}

export default App
