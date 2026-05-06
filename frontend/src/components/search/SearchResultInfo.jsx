// 未使用のコンポーネント
import { Box } from '@mui/material';

const SearchResultInfo = () => {
  const message = '検索結果が見つかりませんでした';
  return <Box sx={{ color: 'red', mt: 2 }}>{message}</Box>;
};

export default SearchResultInfo;
