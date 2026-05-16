import { Box, TextField, List, ListItem, ListItemText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ja } from 'date-fns/locale';
import genDayString from '../../hook/genDayString';

const BookFormFields = ({ book, setBook }) => {
  const handleInput = (param, inputValue) => setBook({ ...book, [param]: inputValue });
  const textFields = [
    { label: 'タイトル', param: 'title' },
    { label: '著者', param: 'author' }
  ];

  return (
    <FieldsLayout>
      {!book.isbn && textFields.map(({ label, param }) => {
        return <TextFieldLayout key={param} label={label} value={book[param]} onChange={e => handleInput(param, e.target.value)} />;
      })}
      <DateField book={book} setBook={handleInput} />
    </FieldsLayout>
  );
};

export default BookFormFields;

const FieldsLayout = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</Box>
);

const TextFieldLayout = ({ label, value, onChange }) => (
  <TextField label={label} variant="outlined" required value={value} onChange={onChange} />
);

const LabelField = ({ label, value }) => (
  <Box>
    <span style={{ color: 'green', margin: 0, fontWeight: 'bold', fontSize: '0.9em', display: 'block' }}>{label}</span>
    <span style={{ color: 'inherit', fontSize: '1.2em', display: 'block' }}>{value}</span>
  </Box>
);

const DateField = ({ book, setBook }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <DatePicker
        label="読了日"
        slotProps={{
          textField: {
            label: '読了日',
            inputProps: { 'aria-label': '読了日入力欄' }
          }
        }}
        value={parseDate(book.date)}
        onChange={(v) => setBook('date', genDayString(v))}
        format="yyyy/MM/dd"
      />
    </LocalizationProvider>
  );
};

// モバイル版ではMM/DDのStringを直接Date型にするエラーになるため、丁寧にパースする
export const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [yyyy, mm, dd] = dateStr.split('/');
  if (!yyyy || !mm || !dd) return null;
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
};