import { ToggleButton, ToggleButtonGroup } from '@mui/material'


const GraphHeader = ({ graphMode, setGraphMode }) => {
  const control = {
    // 選択している値
    value: graphMode,
    onChange: (_, newValue) => {
      if (newValue === null) return;
      setGraphMode(newValue)
    },
    exclusive: true,
  };

  const toggleList = [
    { value: 'author', label: '著者' },
    { value: 'monthly', label: '月次' },
  ];

  return (
    <ToggleButtonGroup size='small' {...control} aria-label="Small sizes" sx={{ bgcolor: '#e0e0e0b9' }}>
      {toggleList.map(({ value, label }) => <ToggleButton key={value} value={value} sx={{ width: 80 }}>{label}</ToggleButton>)}
    </ToggleButtonGroup>
  );
};

export default GraphHeader;