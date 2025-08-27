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

  const toggleList = [
    { value: 'new', label: '新しい順' },
    { value: 'old', label: '古い順' },
  ];

  return (
    <AppBar position="fixed" sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <Toolbar>
        <ToggleButtonGroup size='small' {...control} aria-label="Small sizes" sx={{ bgcolor: '#e0e0e0b9' }}>
          {toggleList.map(({ value, label }) => <ToggleButton key={value} value={value} sx={{ width: 80 }}>{label}</ToggleButton>)}
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;