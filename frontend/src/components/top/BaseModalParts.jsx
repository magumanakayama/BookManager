import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ja } from 'date-fns/locale';

const BaseModalParts = ({ inputBooks, setInputBooks }) => {
  const handleInput = (param, inputValue) => setInputBooks({ ...inputBooks, [param]: inputValue });

  // モバイル版ではMM/DDのStringを直接Date型にするエラーになるため、丁寧にパースする
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [yyyy, mm, dd] = dateStr.split('/');
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="タイトル" variant="outlined" value={inputBooks.title} onChange={e => handleInput('title', e.target.value)} />
      <TextField label="著者" variant="outlined" value={inputBooks.author} onChange={e => handleInput('author', e.target.value)} />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <DatePicker
          label="読了日"
          slotProps={{
            textField: {
              label: '読了日',
              inputProps: { 'aria-label': '読了日入力欄' }
            }
          }}
          value={parseDate(inputBooks.date)}
          onChange={(newValue) => {
            const yyyy = String(newValue.getFullYear());
            const mm = String(newValue.getMonth() + 1).padStart(2, '0');
            const dd = String(newValue.getDate()).padStart(2, '0');
            handleInput('date', `${yyyy}/${mm}/${dd}`);
          }}
          format="yyyy/MM/dd"
        />
      </LocalizationProvider>
    </Box>
  );
}

export default BaseModalParts;
