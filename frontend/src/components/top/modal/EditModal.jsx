import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';

const EditModal = ({ getBookInfo, editBook, deleteBook, setOpen, selectedBookISBN, triggerAlert }) => {
  const [editingBook, setEditingBook] = useState(getBookInfo(selectedBookISBN));
  // ToDo: diffを取るロジックをカスタムフック内に作るのも視野、暫定これでも良い
  const isChanged = (JSON.stringify(editingBook) !== JSON.stringify(getBookInfo(selectedBookISBN))) && editingBook.title && editingBook.author;
  const handleEdit = () => {
    editBook(editingBook);
    triggerAlert('edit');
    setOpen(false);
  }
  const handleDelete = () => {
    deleteBook(editingBook);
    triggerAlert('delete');
    setOpen(false);
  }

  return (
    <ModalLayout setOpen={setOpen}>
      <img src={editingBook.image} alt={editingBook.title} style={{ paddingBottom: 16 }} />
      <BookFormFields book={editingBook} setBook={setEditingBook} />
      <ModalButtons setOpen={setOpen} require={isChanged} handlePositive={handleEdit} handleDelete={handleDelete} />
    </ModalLayout>
  );
}

export default EditModal;