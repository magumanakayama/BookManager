import { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import BaseModalParts from './BaseModalParts'
import { MODAL_STYLE } from '../../constant';

const NEW_BOOK_TEMPLATE = { title: '', author: '', date: '', largeImageUrl: '', isbn: '' };

const SubmitModal = ({ setOpen, handleSubmit, triggerAlert }) => {
  const [initialBooks, setInitialBooks] = useState(NEW_BOOK_TEMPLATE);
  // ToDO: 必須項目を入力させるチェッカーが必要
  // const isChanged = JSON.stringify(initialBooks) !== JSON.stringify(NEW_BOOK_TEMPLATE);

  const handleSubmitCustom = () => {
    const dummyImage = `https://placehold.jp/140x200.png?text=${encodeURIComponent(initialBooks.title || 'No Title')}`;
    const randomIsbn = String(Math.floor(Math.random() * 1e10)).padStart(10, '0');
    handleSubmit({ ...initialBooks, largeImageUrl: dummyImage, isbn: randomIsbn }, triggerAlert('submit'));
    setOpen(false);
  };

  return (
    <Modal open={true} onClose={() => setOpen(false)}>
      <Box sx={MODAL_STYLE}>
        <img src={initialBooks.image} alt={initialBooks.title} style={{ paddingBottom: 16 }} />
        <BaseModalParts initialBooks={initialBooks} setInitialBooks={setInitialBooks} />
        <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={() => setOpen(false)}>閉じる</Button>
          <Button variant="contained" onClick={handleSubmitCustom}>登録</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SubmitModal;