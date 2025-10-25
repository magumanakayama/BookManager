import { Button, Modal, Box, Stack } from '@mui/material'
import useStorageHook from '../hook/storageHook';

const DetailModal = ({ open, setOpen, book }) => {
  const { handleSubmit } = useStorageHook();

  const handleSubmitCustom = (book) => {
    setOpen(false);
    handleSubmit(book);
  };

  const fontSize = book?.Item?.title.length > 20 && '1rem';

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row">
          <img src={book?.Item?.largeImageUrl} alt={book?.Item?.title} />
          <Box sx={{ ml: 2 }}>
            <h2 style={{ fontSize }}>{book?.Item?.title}</h2>
            <p>{book?.Item?.author || '著者不明'}</p>
            <p>{book?.Item?.size}</p>
          </Box>
        </Stack>
        <Box sx={{ my: 2, maxHeight: '50dvh', overflowY: 'auto' }}>
          <p>{book?.Item?.itemCaption}</p>
        </Box>
        <Button variant="contained" onClick={() => handleSubmitCustom(book.Item)}>登録</Button>
        <Button variant="contained" onClick={() => setOpen(false)} sx={{ ml: 1 }}>閉じる</Button>
      </Box>
    </Modal >
  );
};

export default DetailModal;