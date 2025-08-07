import { useState } from 'react'
import { Button, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from './constant';
import theme from './theme'
import './App.css'

import BookModal from './components/BookModal';
import BookTable from './components/BookTable';
import Header from './components/Header';

const TopPage = ({ handleSubmit, bookInfo, setBookInfo, inputBooks, setInputBooks }) => {
  const [open, setOpen] = useState(false)

  const handlePreset = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
  }

  const modalProps = {
    open,
    setOpen,
    handleSubmit,
    inputBooks,
    setInputBooks, // デバックプリセット専用
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`${BASE_URL}/BookSearch`);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header setOpen={setOpen} setInputBooks={setInputBooks} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" onClick={handleSearch}>書籍検索</Button>
        </Box>

        <BookTable bookInfo={bookInfo} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={() => handlePreset([])}>全削除</Button>
          <Button variant="contained" onClick={() => handlePreset([{ title: 'Nのために', author: '湊かなえ', date: '8/2' }, { title: 'コンビニ人間', author: '村田沙耶香', date: '8/3' }])}>デバックプリセット</Button>
        </Box>

        <BookModal {...modalProps} />
      </ThemeProvider>
    </>
  )
}

export default TopPage;
