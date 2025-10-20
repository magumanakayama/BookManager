import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';


export const ERROR_MESSAGE = '月次グラフを表示できません。ブラウザバックしてください。';

const YearSelect = ({ yearlyList, year, setYear }) => {
  if (!yearlyList) {
    return (
      <Box sx={{ color: 'red', mt: 2 }}>
        {ERROR_MESSAGE}
      </Box>
    );
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="year-select-label">年</InputLabel>
        <Select
          labelId="year-select-label"
          value={year}
          label="年"
          onChange={(event) => setYear(event.target.value)}
        >
          {yearlyList.map(({ year }) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default YearSelect;