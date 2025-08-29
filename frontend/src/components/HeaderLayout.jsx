import { AppBar, Toolbar } from '@mui/material'


const HeaderLayout = ({ children }) => {
  return (
    <>
      <AppBar position="fixed" sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Toolbar>
          {children}
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ mb: 2 }} />
    </>
  );
};
export default HeaderLayout;