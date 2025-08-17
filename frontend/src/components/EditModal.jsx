import { Button, Modal, Box, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EditModal = ({ open, setOpen, inputBooks, handleSubmit, setInputBooks }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    width: 280,
    p: 4,
  }

  const handleClose = () => {
    setOpen(false);
    setInputBooks({ title: '', author: '', date: '' });
  };
  const handleInput = (param, inputValue) => setInputBooks({ ...inputBooks, [param]: inputValue });

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [mm, dd] = dateStr.split('/');
    const now = new Date();
    return new Date(now.getFullYear(), Number(mm) - 1, Number(dd));
  };

  const dateValue = parseDate(inputBooks.date);


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <img src={inputBooks.image} alt={inputBooks.title} style={{ paddingBottom: 16 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="タイトル" variant="outlined" value={inputBooks.title} onChange={e => handleInput('title', e.target.value)} />
          <TextField label="著者" variant="outlined" value={inputBooks.author} onChange={e => handleInput('author', e.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="読了日"
              slotProps={{
                textField: { inputProps: { 'aria-label': '読了日入力欄' } }
              }}
              value={dateValue}
              onChange={(newValue) => {
                const mm = String(newValue.getMonth() + 1).padStart(2, '0');
                const dd = String(newValue.getDate()).padStart(2, '0');
                handleInput('date', `${mm}/${dd}`);
              }}
              format="MM/dd"
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={() => handleSubmit(handleClose, inputBooks)}>完了</Button>
          <Button variant="outlined" onClick={handleClose}>閉じる</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditModal;