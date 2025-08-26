import { useState } from 'react';
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import './App.css'

import ImageGrid from './components/ImageGrid';
import Header from './components/Header';
import CustomAlert from './components/CustomAlert';
import ControlModal from './components/ControlModal'
import SpeedDialButtons from './components/SpeedDialButtons';

const TopPage = ({ bookInfo, setBookInfo, alert, setAlert, handleSubmit }) => {
  const [sort, setSort] = useState("new");
  const [open, setOpen] = useState(false);
  const [inputBooks, setInputBooks] = useState({ title: '', author: '', date: '' });


  return (
    <ThemeProvider theme={theme}>
      <Header sort={sort} setSort={setSort} setOpen={setOpen} />
      <Box sx={{ mt: 10, mb: 2 }}>
        <ImageGrid bookInfo={bookInfo} setBookInfo={setBookInfo} sort={sort} setAlert={setAlert} />
        <CustomAlert alert={alert} setAlert={setAlert} />
        <ControlModal modalMode={"submit"} open={open} setOpen={setOpen} inputBooks={inputBooks} setInputBooks={setInputBooks} handleSubmit={handleSubmit} />
        <SpeedDialButtons setOpen={setOpen} />
      </Box>
    </ThemeProvider>
  )
}

export default TopPage;
