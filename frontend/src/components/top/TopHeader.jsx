// 未使用のコンポーネント
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

const TopHeader = ({ sort, setSort }) => {
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
    // ToggleButtonGroupのvalueを持つToggleButtonが選択されるような仕組みにもともとなっている
    <ToggleButtonGroup size='small' {...control} aria-label="Small sizes" sx={{ bgcolor: '#e0e0e0b9' }}>
      {toggleList.map(({ value, label }) => <ToggleButton key={value} value={value} sx={{ width: 80 }}>{label}</ToggleButton>)}
    </ToggleButtonGroup>
  );
};

export default TopHeader;