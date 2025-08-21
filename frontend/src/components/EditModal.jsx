import { Button, Modal, Box, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EditModal = ({ open, setOpen, setBookInfo, inputBooks, setInputBooks }) => {
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

  const handleEdit = (mode) => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const index = books.findIndex(book => book.isbn === inputBooks.isbn);
    mode == 'edit' ? books[index] = { ...books[index], ...inputBooks } : books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setInputBooks({ title: '', author: '', date: '' });
  };
  const handleInput = (param, inputValue) => setInputBooks({ ...inputBooks, [param]: inputValue });

  // モバイル版ではMM/DDのStringを直接Date型にするエラーになるため、丁寧にパースする
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [yyyy, mm, dd] = dateStr.split('/');
    // console.log(new Date(Number(yyyy), Number(mm) - 1, Number(dd)));
    const now = new Date();
    console.log(new Date(now.getFullYear(), Number(mm) - 1, Number(dd)));
    // return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return new Date(now.getFullYear(), Number(mm) - 1, Number(dd))
  };

  // console.log(new Date(Date.now()));

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
              // そもそもDate型をローカルストレージに置くのもあり
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
        <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
          <Button variant="contained" color="error" onClick={() => handleEdit("delete")}>削除</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={handleClose}>閉じる</Button>
          <Button variant="contained" onClick={() => handleEdit("edit")}>完了</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditModal;