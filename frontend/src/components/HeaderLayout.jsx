import { AppBar, Toolbar } from '@mui/material'

const HeaderLayout = ({ children }) => {
  const appBarSx = {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const toolbarSx = {
    mb: 2,
  };

  return (
    <>
      <AppBar position="fixed" sx={appBarSx}>
        <Toolbar>
          {children}
        </Toolbar>
      </AppBar>
      <Toolbar sx={toolbarSx} />
    </>
  );
};
export default HeaderLayout;