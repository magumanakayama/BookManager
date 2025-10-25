import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { BASE_URL } from './constant';

import TopPage from './TopPage';
import BookSearch from './components/search/BookSearch';
import BookGraph from './components/graph/BookGraph';
import MockComponent from './MockComponent';
import theme from './theme'
import './App.css'


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={`${BASE_URL}/`} element={<TopPage />} />
          <Route path={`${BASE_URL}/BookSearch`} element={<BookSearch />} />
          <Route path={`${BASE_URL}/BookGraph`} element={<BookGraph />} />
          <Route path={`${BASE_URL}/Mock`} element={<MockComponent />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
