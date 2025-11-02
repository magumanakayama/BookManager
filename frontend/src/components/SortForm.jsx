// 未使用のコンポーネント
import { Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material'

const SortForm = ({ sort, setSort }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>並べ替え</InputLabel>
        <Select
          value={sort}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="off">無し</MenuItem>
          <MenuItem value="date">日付順</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortForm;
