import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { BASE_URL } from './constant';

import TopPage from './TopPage';
import BookSearch from './components/search/BookSearch';
import BookGraph from './components/graph/BookGraph';
import theme from './theme'
import './App.css'


function App() {

  const [bookInfo, setBookInfo] = useState(JSON.parse(localStorage.getItem('books')) || []);

  const handleSubmit = (handleClose, submitBook) => {
    localStorage.setItem("books", JSON.stringify([...bookInfo, { title: submitBook.title, author: submitBook.author, date: submitBook.date, image: submitBook.image, isbn: submitBook.isbn }]));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
    handleClose();
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={`${BASE_URL}/`} element={<TopPage handleSubmit={handleSubmit} bookInfo={bookInfo} setBookInfo={setBookInfo} />} />
          <Route path={`${BASE_URL}/BookSearch`} element={<BookSearch handleSubmit={handleSubmit} />} />
          <Route path={`${BASE_URL}/BookGraph`} element={<BookGraph bookInfo={bookInfo} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
