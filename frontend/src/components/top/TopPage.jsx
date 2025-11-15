import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import useCustomParams from '../../lib/paramsHook';
import theme from '../../theme'
import '../../App.css'

// ユーザー定義コンポーネント
import ImageGrid from './ImageGrid'
import SpeedDialButtons from './SpeedDialButtons';
import CustomAlert from './CustomAlert';

// カスタムフック
import useAlertHook from '../hook/alertHook';
import useStorageHook from '../hook/storageHook';

const TopPage = () => {
  const { bookStorage, setBookStorage } = useStorageHook();
  const { alert, triggerAlert, close } = useAlertHook();
  // クエリパラメータsortに応じて表示を切り替え
  const sort = useCustomParams().getParam().val;

  // ImageGrid用props
  const imageGridProps = {
    bookStorage,
    setBookStorage,
    sort,
    triggerAlert
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mb: 2 }}>
        <ImageGrid {...imageGridProps} />
        <CustomAlert alert={alert} close={close} />
        <SpeedDialButtons bookStorage={bookStorage} setBookStorage={setBookStorage} />
      </Box>
    </ThemeProvider>
  )
}

export default TopPage;
