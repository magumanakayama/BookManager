import { Button, Modal, Box, Stack } from '@mui/material'

const DetailModal = ({ open, setOpen, book, handleSubmitCustom }) => {

  const handleSubmitCustom2 = (book) => {
    setOpen(false);
    handleSubmitCustom(book);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row">
          <img src={book?.Item?.largeImageUrl} alt={book?.Item?.title} />
          <Box sx={{ ml: 2 }}>
            <h2>{book?.Item?.title}</h2>
            <p>{book?.Item?.author || '著者不明'}</p>
            <p>{book?.Item?.size}</p>
          </Box>
        </Stack>
        <Box sx={{ maxHeight: '50dvh', overflowY: 'auto' }}>
          <p>{book?.Item?.itemCaption}</p>
        </Box>
        <Button variant="contained" onClick={() => handleSubmitCustom2(book)}>登録</Button>
        <Button variant="contained" onClick={() => setOpen(false)} sx={{ ml: 1 }}>閉じる</Button>
      </Box>
    </Modal >
  );
};

export default DetailModal;