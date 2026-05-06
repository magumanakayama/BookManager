import { Button, Modal, Box, Stack } from '@mui/material'

const DetailModal = ({ setOpen, book, handleSubmit }) => {
  const ButtonList = [
    { onClick: () => handleSubmit(book), label: '登録' },
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
  const FONT_SIZE = book?.title.length > 20 && '1rem';
  return (
    <Stack direction="row">
      <img src={book?.largeImageUrl} alt={book?.title} />
      <Box sx={{ ml: 2 }}>
        <h2 style={{ fontSize: FONT_SIZE }}>{book?.title}</h2>
        <p>{book?.author || '著者不明'}</p>
        <p>{book?.size}</p>
      </Box>
    </Stack>
  );
};

const Caption = ({ book }) => {
  return (
    <Box sx={{ my: 2, maxHeight: '50dvh', overflowY: 'auto' }}>
      {/* 外観モードに依存させないために文字色を白に固定 */}
      <Box component="p" sx={{ color: '#ffeeeeff' }}>{book?.itemCaption}</Box>
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