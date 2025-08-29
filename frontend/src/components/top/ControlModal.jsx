import { useEffect } from 'react';
import { Button, Modal, Box } from '@mui/material';
import BaseModalParts from './BaseModalParts'
import generateTodayString from '../../generateTodayString';

const ControlModal = ({ modalMode, open, setOpen, setBookInfo = () => { }, inputBooks, setInputBooks, setAlert = () => { }, handleSubmit = () => { } }) => {
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
    const editFunc = {
      edit: () => {
        books[index] = { ...books[index], ...inputBooks };
        setAlert({ open: true, message: '書籍情報を更新しました', severity: 'success' });
      },
      delete: () => {
        books.splice(index, 1);
        setAlert({ open: true, message: '書籍情報を削除しました', severity: 'success' });
      }
    }
    editFunc[mode]();
    localStorage.setItem('books', JSON.stringify(books));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
    handleClose();
  };

  const handleSubmitCustom = () => {
    const dummyImage = `https://placehold.jp/140x200.png?text=${encodeURIComponent(inputBooks.title || 'No Title')}`;
    const randomIsbn = String(Math.floor(Math.random() * 1e10)).padStart(10, '0');
    handleSubmit({ ...inputBooks, largeImageUrl: dummyImage, isbn: randomIsbn });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setInputBooks({ title: '', author: '', date: '' });
  };

  useEffect(() => {
    modalMode === "submit" && setInputBooks({ ...inputBooks, date: generateTodayString() });
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <img src={inputBooks.image} alt={inputBooks.title} style={{ paddingBottom: 16 }} />
        <BaseModalParts inputBooks={inputBooks} setInputBooks={setInputBooks} />
        <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
          {modalMode === "edit" && <Button variant="contained" color="error" onClick={() => handleEdit("delete")}>削除</Button>}
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={handleClose}>閉じる</Button>
          {modalMode === "submit" && <Button variant="contained" onClick={handleSubmitCustom}>登録</Button>}
          {modalMode === "edit" && <Button variant="contained" onClick={() => handleEdit("edit")}>完了</Button>}
        </Box>
      </Box>
    </Modal>
  );
}

export default ControlModal;