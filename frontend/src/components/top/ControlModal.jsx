import { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import BaseModalParts from './BaseModalParts'
import CustomAlert from '../CustomAlert';
import useStorageHook from '../hook/storageHook';
import useAlertHook from '../hook/alertHook';
import { MODAL_STYLE } from '../../constant';


const ControlModal = ({ modalMode, setOpen, selectedBookISBN }) => {
  const { bookStorage, setBookStorage, handleSubmit, getBookInfo } = useStorageHook();
  const { alert, triggerAlert } = useAlertHook();

  const [initialBooks, setInitialBooks] = useState(getBookInfo(selectedBookISBN));
  // ToDO: diffを取るロジックをカスタムフック内に作るのも視野、暫定これでも良い
  const isChanged = JSON.stringify(initialBooks) !== JSON.stringify(getBookInfo(selectedBookISBN));

  const handleEdit = (mode) => {
    const updateBookInfo = [...bookStorage];
    const index = bookStorage.findIndex(book => book.isbn === initialBooks.isbn);
    const editFunc = {
      edit: () => {
        updateBookInfo[index] = { ...updateBookInfo[index], ...initialBooks };
        const message = '書籍情報を更新しました';
        return { message };
      },
      delete: () => {
        updateBookInfo.splice(index, 1);
        const message = '書籍情報を削除しました';
        return { message };
      }
    }
    editFunc[mode]();
    setBookStorage(updateBookInfo);
    triggerAlert(mode);
    setOpen(false);
  };

  const handleSubmitCustom = () => {
    const dummyImage = `https://placehold.jp/140x200.png?text=${encodeURIComponent(initialBooks.title || 'No Title')}`;
    const randomIsbn = String(Math.floor(Math.random() * 1e10)).padStart(10, '0');
    handleSubmit({ ...initialBooks, largeImageUrl: dummyImage, isbn: randomIsbn }, triggerAlert('submit'));
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={MODAL_STYLE}>
          <img src={initialBooks.image} alt={initialBooks.title} style={{ paddingBottom: 16 }} />
          <BaseModalParts initialBooks={initialBooks} setInitialBooks={setInitialBooks} />
          <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
            {modalMode === "edit" && <Button variant="contained" color="error" onClick={() => handleEdit('delete')}>削除</Button>}
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="outlined" onClick={() => setOpen(false)}>閉じる</Button>
            {modalMode === "submit" && <Button variant="contained" onClick={handleSubmitCustom}>登録</Button>}
            {modalMode === "edit" && <Button variant="contained" disabled={!isChanged} onClick={() => handleEdit('edit')}>完了</Button>}
          </Box>
        </Box>
      </Modal>
      <CustomAlert alert={alert} fireAlert={(alert) => triggerAlert(alert)} />
    </>
  );
}

export default ControlModal;