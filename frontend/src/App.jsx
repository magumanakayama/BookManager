// ReactRouter
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// MUI
import { ThemeProvider } from '@mui/material/styles';
// 独自定義コンポーネント
import AppHeader from './components/AppHeader';
import TopPage from './components/top/TopPage';
import BookSearch from './components/search/BookSearch';
import BookGraph from './components/graph/BookGraph';
import DeveloperMode from './components/developer/DeveloperMode';
import MockComponent from './MockComponent';
// 定数/テーマ
import './App.css'
import theme from './theme'
import { BASE_URL } from './constant';

function App() {
  return (
    // 全てのルートにベースURLを設定
    <Router basename={BASE_URL}>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* 共通ヘッダーを使用する場合、この中のchildrenに入れる */}
          <Route path={'/'} element={<AppHeader />}>
            <Route index element={<TopPage />} />
            <Route path={'BookGraph'} element={<BookGraph />} />
          </Route>
          {/* 共通ヘッダーを使用しないルート */}
          <Route path={'/BookSearch'} element={<BookSearch />} />
          <Route path={'/DeveloperMode'} element={<DeveloperMode />} />
          <Route path={'/Mock'} element={<MockComponent />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App;