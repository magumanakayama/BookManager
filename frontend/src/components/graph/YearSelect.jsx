import { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const YearSelect = ({ yearlyList, year, setYear }) => {
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>とし</InputLabel>
        <Select
          value={year}
          label="とし"
          onChange={handleChange}
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