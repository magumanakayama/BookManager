import { Button, Modal, Box, TextField } from '@mui/material'
import theme from '../theme'

const BookModal = ({ open, setOpen, inputBooks, bookInfo, setBookInfo, setInputBooks }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: theme.palette.primary.dark,
    width: 720,
    height: 480,
    p: 4,
  }

  const handleClose = () => {
    setOpen(false);
    setInputBooks({ title: '', author: '', date: '' });
  };

  const handleSubmit = () => {
    localStorage.setItem("books", JSON.stringify([...bookInfo, { title: inputBooks.title, author: inputBooks.author, date: inputBooks.date }]));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
    handleClose();
  }
  const handleInput = (param, inputValue) => setInputBooks({ ...inputBooks, [param]: inputValue });


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <TextField label="タイトル" variant="outlined" value={inputBooks.title} onChange={e => handleInput('title', e.target.value)} />
        <TextField label="著者" variant="outlined" value={inputBooks.author} onChange={e => handleInput('author', e.target.value)} />
        <TextField label="読了日" variant="outlined" value={inputBooks.date} onChange={e => handleInput('date', e.target.value)} />
        <Button variant="contained" onClick={handleClose}>閉じる</Button>
        <Button variant="contained" onClick={handleSubmit}>登録</Button>
        <Button variant="contained" onClick={() => setInputBooks({ title: '成瀬は天下を取りにいく', author: '宮島未奈', date: '03/22' })}>デバックプリセット</Button>
        <Button variant="contained" onClick={() => { }}>カレンダー</Button>
      </Box>
    </Modal>
  );
}

export default BookModal