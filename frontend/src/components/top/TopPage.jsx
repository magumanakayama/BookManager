import { useState } from 'react';
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme'
import '../../App.css'

// ユーザー定義コンポーネント
import ImageGrid from './ImageGrid';
import HeaderLayout from '../HeaderLayout';
import TopHeader from './TopHeader';
import SubmitModal from './modal/SubmitModal';
import SpeedDialButtons from '../SpeedDialButtons';
import CSVModal from './CSVModal';
import CustomAlert from '../CustomAlert';

// カスタムフック
import useAlertHook from '../hook/alertHook';
import useStorageHook from '../hook/storageHook';

const TopPage = () => {
  const [sort, setSort] = useState("new");
  const [open, setOpen] = useState(false);
  const [CSVopen, setCSVOpen] = useState(false);
  const { bookStorage, setBookStorage, handleSubmit } = useStorageHook();
  const { alert, triggerAlert, close } = useAlertHook();

  return (
    <ThemeProvider theme={theme}>
      <HeaderLayout>
        <TopHeader sort={sort} setSort={setSort} />
      </HeaderLayout>
      <Box sx={{ mb: 2 }}>
        <ImageGrid bookInfo={bookStorage} setBookInfo={setBookStorage} sort={sort} />
        {open && <SubmitModal setOpen={setOpen} handleSubmit={handleSubmit} triggerAlert={triggerAlert} />}
        <CustomAlert alert={alert} close={close} />
        {CSVopen && <CSVModal setCSVOpen={setCSVOpen} bookInfo={bookStorage} setBookInfo={setBookStorage} />}
        <SpeedDialButtons setOpen={setOpen} setCSVOpen={setCSVOpen} />
      </Box>
    </ThemeProvider>
  )
}

export default TopPage;
