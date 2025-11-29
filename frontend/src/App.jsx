import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { BASE_URL } from './constant';

import TopPage from './components/top/TopPage';
import BookSearch from './components/search/BookSearch';
import BookGraph from './components/graph/BookGraph';
import MockComponent from './MockComponent';
import theme from './theme'
import './App.css'

import HeaderLayout from './components/HeaderLayout';
import CommonHeader from './components/CommonHeader';

function App() {
  return (
    <Router basename={BASE_URL}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={'/'} element={<MockConsole />}>
            <Route index element={<TopPage />} />
            <Route path={'BookGraph'} element={<BookGraph />} />
          </Route>
          <Route path={'/BookSearch'} element={<BookSearch />} />
          <Route path={'/Mock'} element={<MockComponent />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App;

const MockConsole = () => {
  return (
    <>
      <HeaderLayout>
        <CommonHeader />
      </HeaderLayout>
      <Outlet />
    </>
  );
};
