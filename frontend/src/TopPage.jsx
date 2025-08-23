import { useState } from 'react';
import { Button, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme'
import './App.css'

import ImageGrid from './components/ImageGrid';
import Header from './components/Header';
import SortForm from './components/SortForm';

const TopPage = ({ bookInfo, setBookInfo }) => {
  const [sort, setSort] = useState('off');

  // const handlePreset = (books) => {
  //   localStorage.setItem('books', JSON.stringify(books));
  //   setBookInfo(JSON.parse(localStorage.getItem('books')));
  // }


  return (
    <ThemeProvider theme={theme}>
      <Header sort={sort} setSort={setSort} />
      <Box sx={{ mt: 10 }}>
        {/* <SortForm sort={sort} setSort={setSort} /> */}
        <ImageGrid bookInfo={bookInfo} setBookInfo={setBookInfo} sort={sort} />
        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={() => handlePreset([])}>全削除</Button>
        </Box> */}
      </Box>
    </ThemeProvider >
  )
}

export default TopPage;
