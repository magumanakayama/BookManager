// MUI
import { AppBar, Toolbar } from '@mui/material'

// 専用の定数
const APPBAR_SX = {
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const TOOLBAR_SX = {
  mb: 2,
};

// 共通ヘッダーのレイアウトコンポーネント
const HeaderLayout = ({ children }) => {
  return (
    <>
      <AppBar position="fixed" sx={APPBAR_SX}>
        <Toolbar>{children}</Toolbar>
      </AppBar>
      <Toolbar sx={TOOLBAR_SX} />
    </>
  );
};

export default HeaderLayout;