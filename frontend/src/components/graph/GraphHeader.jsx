import { ToggleButton, ToggleButtonGroup } from '@mui/material'


const GraphHeader = ({ sort, setSort }) => {
  const control = {
    value: sort,
    onChange: (_, newValue) => {
      if (newValue === null) return;
      setSort(newValue)
    },
    exclusive: true,
  };

  const toggleList = [
    { value: 'author', label: '著者' },
    { value: 'yearly', label: '年次' },
  ];

  return (
    <ToggleButtonGroup size='small' {...control} aria-label="Small sizes" sx={{ bgcolor: '#e0e0e0b9' }}>
      {toggleList.map(({ value, label }) => <ToggleButton key={value} value={value} sx={{ width: 80 }}>{label}</ToggleButton>)}
    </ToggleButtonGroup>
  );
};

export default GraphHeader;