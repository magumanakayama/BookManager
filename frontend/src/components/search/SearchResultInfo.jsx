import { Box } from '@mui/material';

const SearchResultInfo = ({ data, loading, error }) => {
  const message =
    (data?.Items?.length === 0 && !loading && error === undefined && '検索結果が見つかりませんでした') ||
    (error && (typeof error === 'string' ? error : '検索中にエラーが発生しました')) ||
    '';

  return <Box sx={{ color: 'red', mt: 2 }}>{message}</Box>;
};

export default SearchResultInfo;
