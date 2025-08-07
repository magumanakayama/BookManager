import { Button, Modal, Box, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const BookModal = ({ open, setOpen, inputBooks, handleSubmit, setInputBooks }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    width: 480,
    p: 4,
  }

  const handleClose = () => {
    setOpen(false);
    setInputBooks({ title: '', author: '', date: '' });
  };
  const handleInput = (param, inputValue) => setInputBooks({ ...inputBooks, [param]: inputValue });


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="タイトル" variant="outlined" value={inputBooks.title} onChange={e => handleInput('title', e.target.value)} />
          <TextField label="著者" variant="outlined" value={inputBooks.author} onChange={e => handleInput('author', e.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="読了日"
              value={new Date(inputBooks.date)}
              onChange={(newValue) => {
                const mm = String(newValue.getMonth() + 1);
                const dd = String(newValue.getDate());
                handleInput('date', `${mm}/${dd}`);
              }}
              format="MM/dd"
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: 'flex', mt: 8, gap: 1 }}>
          <Button variant="contained" onClick={() => setInputBooks({ title: '成瀬は天下を取りにいく', author: '宮島未奈', date: '3/22' })}>デバックプリセット</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={() => handleSubmit(handleClose, inputBooks)}>登録</Button>
          <Button variant="outlined" onClick={handleClose}>閉じる</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default BookModal