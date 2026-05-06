// MUI
import { Button } from '@mui/material';

// 汎用戻るボタン
export const BackButton = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => window.history.back()}>
      戻る
    </Button>
  );
};

// 汎用Fetchボタン
export const FetchButton = ({ loading, onClick, disabled }) => {
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled} sx={{ width: 88 }}>
      {genMessage(loading)}
    </Button>
  );
};

const genMessage = (loading) => {
  if (loading) return '検索中';
  return '検索';
}