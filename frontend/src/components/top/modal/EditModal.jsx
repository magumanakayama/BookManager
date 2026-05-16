import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';
import { bookIsChanged } from '../../hook/storageHook';
import { Box, Stack, List, ListItem, ListItemText } from '@mui/material';


const EditModal = ({ onClose, selectedBookInfo, handleEdit, handleDelete }) => {
  // 編集用state
  const [editingBook, setEditingBook] = useState(selectedBookInfo);

  // ToDo: diffを取るロジックを別カスタムフック化、submitと統合する
  const isChanged =
    bookIsChanged(editingBook, selectedBookInfo) &&
    editingBook.title &&
    editingBook.author;

  return (
    <ModalLayout onClose={onClose}>
      <BookInfoArea book={editingBook} />
      <BookFormFields book={editingBook} setBook={setEditingBook} />
      <ModalButtons
        onClose={onClose}
        require={isChanged}
        name="更新"
        handlePositive={() => handleEdit(editingBook)}
        handleDelete={() => handleDelete(editingBook)}
      />
    </ModalLayout>
  );
}

export default EditModal;

// 編集モーダルの本の情報表示エリア
const BookInfoArea = ({ book }) => {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1}>
      <img src={book.image} alt={book.title} style={{ paddingBottom: 24 }} />
      <InfoList book={book} />
    </Stack>
  );
}

const InfoList = ({ book }) => {
  const INFO_LABELS = [
    { label: 'タイトル', param: 'title' },
    { label: '著者', param: 'author' }
  ];

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {INFO_LABELS.map(({ label, param }) => (
        <ListItem key={param}>
          <ListItemText
            primary={label}
            secondary={book[param]}
            primaryTypographyProps={{ fontSize: '0.8em', color: 'green' }}
          />
        </ListItem>
      ))}
    </List>
  );
};