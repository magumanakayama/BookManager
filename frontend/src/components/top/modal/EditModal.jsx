import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';
import { bookIsChanged } from '../../hook/storageHook';

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
      <img src={editingBook.image} alt={editingBook.title} style={{ paddingBottom: 16 }} />
      <BookFormFields book={editingBook} setBook={setEditingBook} />
      <ModalButtons
        onClose={onClose}
        require={isChanged}
        handlePositive={() => handleEdit(editingBook)}
        handleDelete={() => handleDelete(editingBook)}
      />
    </ModalLayout>
  );
}

export default EditModal;