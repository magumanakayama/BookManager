import { Box } from '@mui/material';

const SearchResultInfo = ({ data, loading, error }) => {
  return (
    <>
      {/* 検索結果が0件の場合 */}
      {data?.Items?.length === 0 && !loading && error === undefined && (
        <Box sx={{ color: 'red', mt: 2 }}>
          検索結果が見つかりませんでした
        </Box>
      )}
      {/* エラー表示 */}
      {error && (
        <Box sx={{ color: 'red', mt: 2 }}>
          {typeof error === 'string' ? error : '検索中にエラーが発生しました'}
        </Box>
      )}
    </>
  );
};

export default SearchResultInfo;
