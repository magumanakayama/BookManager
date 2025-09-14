import { Button, Modal, Box, Grow } from '@mui/material';
import BaseModalParts from './BaseModalParts'
import { MODAL_STYLE } from '../../constant';


const ControlModal = ({ modalMode, open, setOpen, bookInfo, setBookInfo = () => { }, inputBooks, setInputBooks, setAlert = () => { }, handleSubmit = () => { } }) => {
  const handleEdit = (mode) => {
    const index = bookInfo.findIndex(book => book.isbn === inputBooks.isbn);
    const editFunc = {
      edit: () => {
        bookInfo[index] = { ...bookInfo[index], ...inputBooks };
        setAlert({ open: true, message: '書籍情報を更新しました', severity: 'success' });
      },
      delete: () => {
        bookInfo.splice(index, 1);
        setAlert({ open: true, message: '書籍情報を削除しました', severity: 'success' });
      }
    }
    editFunc[mode]();
    setBookInfo(bookInfo);
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


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={MODAL_STYLE}>
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
    </Modal >
  );
}

export default ControlModal;