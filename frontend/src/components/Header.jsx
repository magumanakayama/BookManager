import { Stack, ToggleButton, ToggleButtonGroup, AppBar, Toolbar } from '@mui/material'


const Header = ({ sort, setSort, }) => {

  const control = {
    value: sort,
    onChange: (_, newValue) => {
      if (newValue === null) return;
      setSort(newValue)
    },
    exclusive: true,
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <Toolbar>
        <ToggleButtonGroup size='small' {...control} aria-label="Small sizes" sx={{ bgcolor: '#e0e0e0b9' }}>
          <ToggleButton value="new">新しい順</ToggleButton>
          <ToggleButton value="old">古い順</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;