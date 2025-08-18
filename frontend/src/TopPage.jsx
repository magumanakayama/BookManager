import { Button, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme'
import './App.css'

import BookTable from './components/BookTable';
import ImageGrid from './components/ImageGrid';
import Header from './components/Header';

const TopPage = ({ bookInfo, setBookInfo, inputBooks, setInputBooks }) => {

  const handlePreset = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        {/* <BookTable bookInfo={bookInfo} /> */}
        <Box sx={{ mt: 12 }}>
          <ImageGrid bookInfo={bookInfo} setBookInfo={setBookInfo} inputBooks={inputBooks} setInputBooks={setInputBooks} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            {/* <Button variant="contained" onClick={() => handlePreset([])}>全削除</Button> */}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default TopPage;
