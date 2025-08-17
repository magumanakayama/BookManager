import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { BASE_URL } from './constant';

import BookSearch from './components/search/BookSearch';
import TopPage from './TopPage';
import theme from './theme'
import './App.css'


function App() {

  const [bookInfo, setBookInfo] = useState(JSON.parse(localStorage.getItem('books')) || []);
  const [inputBooks, setInputBooks] = useState({ title: '', author: '', date: '' });

  const handleSubmit = (handleClose, submitBook) => {
    console.log(submitBook);
    localStorage.setItem("books", JSON.stringify([...bookInfo, { title: submitBook.title, author: submitBook.author, date: submitBook.date, image: submitBook.image, isbn: submitBook.isbn }]));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
    handleClose();
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={`${BASE_URL}/`} element={<TopPage handleSubmit={handleSubmit} bookInfo={bookInfo} setBookInfo={setBookInfo} inputBooks={inputBooks} setInputBooks={setInputBooks} />} />
          <Route path={`${BASE_URL}/BookSearch`} element={<BookSearch handleSubmit={handleSubmit} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
