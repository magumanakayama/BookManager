import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import './App.css'

import ImageGrid from './components/top/ImageGrid';
import HeaderLayout from './components/HeaderLayout';
import TopHeader from './components/top/TopHeader';
import CustomAlert from './components/CustomAlert';
import ControlModal from './components/top/ControlModal'
import SpeedDialButtons from './components/SpeedDialButtons';
import CSVModal from './components/top/CSVModal';


const TopPage = () => {
  const [bookInfo, setBookInfo] = useLocalStorage('books', []);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' })
  const [sort, setSort] = useState("new");
  const [open, setOpen] = useState(false);
  const [CSVopen, setCSVOpen] = useState(false);
  const [inputBooks, setInputBooks] = useState({ title: '', author: '', date: '', largeImageUrl: '', isbn: '' });


  return (
    <ThemeProvider theme={theme}>
      <HeaderLayout>
        <TopHeader sort={sort} setSort={setSort} setOpen={setOpen} />
      </HeaderLayout>
      <Box sx={{ mb: 2 }}>
        <ImageGrid bookInfo={bookInfo} setBookInfo={setBookInfo} sort={sort} setAlert={setAlert} inputBooks={inputBooks} setInputBooks={setInputBooks} />
        <CustomAlert alert={alert} setAlert={setAlert} />
        <ControlModal modalMode={"submit"} open={open} setOpen={setOpen} bookInfo={bookInfo} inputBooks={inputBooks} setInputBooks={setInputBooks} />
        <CSVModal CSVopen={CSVopen} setCSVOpen={setCSVOpen} bookInfo={bookInfo} setBookInfo={setBookInfo} setAlert={setAlert} />
        <SpeedDialButtons setOpen={setOpen} setCSVOpen={setCSVOpen} setInputBooks={setInputBooks} />
      </Box>
    </ThemeProvider >
  )
}

export default TopPage;
