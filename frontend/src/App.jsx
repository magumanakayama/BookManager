import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { BASE_URL } from './constant';

import TopPage from './TopPage';
import BookSearch from './components/search/BookSearch';
import BookGraph from './components/graph/BookGraph';
import MockComponent from './MockComponent';
import generateTodayString from './generateTodayString';
import theme from './theme'
import './App.css'


function App() {
  const [bookInfo, setBookInfo] = useState(JSON.parse(localStorage.getItem('books')) || []);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const handleSubmit = (submitBook) => {
    localStorage.setItem("books", JSON.stringify([...bookInfo, { title: submitBook.title, author: submitBook.author || '著者不明', date: generateTodayString(), image: submitBook.largeImageUrl, isbn: submitBook.isbn }]));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
    setAlert({ open: true, message: '書籍情報を登録しました', severity: 'success' });
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={`${BASE_URL}/`} element={<TopPage bookInfo={bookInfo} setBookInfo={setBookInfo} alert={alert} setAlert={setAlert} handleSubmit={handleSubmit} />} />
          <Route path={`${BASE_URL}/BookSearch`} element={<BookSearch handleSubmit={handleSubmit} />} />
          <Route path={`${BASE_URL}/BookGraph`} element={<BookGraph bookInfo={bookInfo} />} />
          <Route path={`${BASE_URL}/Mock`} element={<MockComponent />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
