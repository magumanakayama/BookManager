import { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import BaseModalParts from './BaseModalParts'
import useStorageHook from '../hook/storageHook';
import { MODAL_STYLE } from '../../constant';


const EditModal = ({ modalMode, bookInfo, setBookInfo, setOpen, selectedBookISBN, triggerAlert }) => {
  const { getBookInfo } = useStorageHook();
  const [initialBooks, setInitialBooks] = useState(getBookInfo(selectedBookISBN));
  // ToDO: diffを取るロジックをカスタムフック内に作るのも視野、暫定これでも良い
  const isChanged = JSON.stringify(initialBooks) !== JSON.stringify(getBookInfo(selectedBookISBN));

  const handleEditOrDelete = (mode) => {
    const updateBookInfo = [...bookInfo];
    const index = bookInfo.findIndex(b => b.isbn === initialBooks.isbn);
    if (mode === 'edit') {
      updateBookInfo[index] = { ...updateBookInfo[index], ...initialBooks };
    } else if (mode === 'delete') {
      updateBookInfo.splice(index, 1);
    }
    triggerAlert(mode);
    setBookInfo(updateBookInfo);
    setOpen(false);
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={MODAL_STYLE}>
        <img src={initialBooks.image} alt={initialBooks.title} style={{ paddingBottom: 16 }} />
        <BaseModalParts initialBooks={initialBooks} setInitialBooks={setInitialBooks} />
        <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
          {modalMode === "edit" && <Button variant="contained" color="error" onClick={() => handleEditOrDelete('delete')}>削除</Button>}
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={() => setOpen(false)}>閉じる</Button>
          <Button variant="contained" disabled={!isChanged} onClick={() => handleEditOrDelete('edit')}>完了</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditModal;