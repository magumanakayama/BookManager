import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import useCustomParams from '../../lib/paramsHook';
import theme from '../../theme'
import '../../App.css'

// ユーザー定義コンポーネント
import ImageGrid from './ImageGrid'
import SpeedDialButtons from './SpeedDialButtons';

// カスタムフック
import useStorageHook from '../hook/storageHook';

const TopPage = () => {
  // 書籍インスタンスを生成
  const bookStorageInstance = useStorageHook();

  // クエリパラメータsortに応じて表示を切り替え
  const sort = useCustomParams().query.value;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mb: 2 }}>
        <ImageGrid bookStorageInstance={bookStorageInstance} sort={sort} />
        <SpeedDialButtons bookStorageInstance={bookStorageInstance} />
      </Box>
    </ThemeProvider>
  )
}

export default TopPage;
