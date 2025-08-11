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
          <img src={book?.volumeInfo.imageLinks?.thumbnail} alt={book?.volumeInfo.title} />
          <Box sx={{ ml: 2 }}>
            <h2>{book?.volumeInfo.title}</h2>
            <p>{book?.volumeInfo.authors?.join(', ') || '著者不明'}</p>
          </Box>
        </Stack>
        <p>{book?.volumeInfo.description}</p>
        <Button variant="contained" onClick={() => handleSubmitCustom2(book)}>登録</Button>
        <Button variant="contained" onClick={() => setOpen(false)} sx={{ ml: 1 }}>閉じる</Button>
      </Box>
    </Modal>
  );
};

export default DetailModal;