import { useState } from 'react';
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme'
import './App.css'

import ImageGrid from './components/ImageGrid';
import Header from './components/Header';
import CustomAlert from './components/CustomAlert';

const TopPage = ({ bookInfo, setBookInfo, alert, setAlert }) => {
  const [sort, setSort] = useState("new");


  return (
    <ThemeProvider theme={theme}>
      <Header sort={sort} setSort={setSort} />
      <Box sx={{ mt: 10 }}>
        <ImageGrid bookInfo={bookInfo} setBookInfo={setBookInfo} sort={sort} setAlert={setAlert} />
        <CustomAlert alert={alert} setAlert={setAlert} />
      </Box>
    </ThemeProvider >
  )
}

export default TopPage;
