import { Button, Modal, Box, Stack } from '@mui/material'

const DetailModal = ({ setOpen, book, handleSubmit }) => {
  const ButtonList = [
    { onClick: () => handleSubmit(book.Item), label: '登録' },
    { onClick: () => setOpen(false), label: '閉じる' },
  ];

  return (
    <ModalLayout onClose={() => setOpen(false)}>
      <Info book={book} />
      <Caption book={book} />
      <Buttons list={ButtonList} />
    </ModalLayout>
  );
};

export default DetailModal;

const ModalLayout = ({ children, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Modal >
  );
};

const Info = ({ book }) => {
  const FONT_SIZE = book?.Item?.title.length > 20 && '1rem';
  return (
    <Stack direction="row">
      <img src={book?.Item?.largeImageUrl} alt={book?.Item?.title} />
      <Box sx={{ ml: 2 }}>
        <h2 style={{ fontSize: FONT_SIZE }}>{book?.Item?.title}</h2>
        <p>{book?.Item?.author || '著者不明'}</p>
        <p>{book?.Item?.size}</p>
      </Box>
    </Stack>
  );
};

const Caption = ({ book }) => {
  return (
    <Box sx={{ my: 2, maxHeight: '50dvh', overflowY: 'auto' }}>
      <p>{book?.Item?.itemCaption}</p>
    </Box>
  );
};

const Buttons = ({ list }) => {
  return (
    <Stack direction="row" spacing={1}>
      {list.map((item, index) => <Button key={index} variant="contained" onClick={item.onClick}>{item.label}</Button>)}
    </Stack>
  );
};