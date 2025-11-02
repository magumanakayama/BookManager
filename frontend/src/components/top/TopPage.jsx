import { useState } from 'react';
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme'
import '../../App.css'

// ユーザー定義コンポーネント
import ImageGrid from './ImageGrid';
import HeaderLayout from '../HeaderLayout';
import TopHeader from './TopHeader';
import SpeedDialButtons from './SpeedDialButtons';
import CustomAlert from './CustomAlert';

// カスタムフック
import useAlertHook from '../hook/alertHook';
import useStorageHook from '../hook/storageHook';

const TopPage = () => {
  const [sort, setSort] = useState("new");
  const { bookStorage, setBookStorage, getBookInfo, submitBook, editBook, deleteBook, sortBooks } = useStorageHook();
  const { alert, triggerAlert, close } = useAlertHook();

  return (
    <ThemeProvider theme={theme}>
      <HeaderLayout>
        <TopHeader sort={sort} setSort={setSort} />
      </HeaderLayout>
      <Box sx={{ mb: 2 }}>
        <ImageGrid getBookInfo={getBookInfo} editBook={editBook} deleteBook={deleteBook} sortBooks={sortBooks} sort={sort} triggerAlert={triggerAlert} />
        <CustomAlert alert={alert} close={close} />
        <SpeedDialButtons bookStorage={bookStorage} setBookStorage={setBookStorage} submitBook={submitBook} triggerAlert={triggerAlert} />
      </Box>
    </ThemeProvider>
  )
}

export default TopPage;
