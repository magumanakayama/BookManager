import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';
import useStorageHook from '../../hook/storageHook';

const EditModal = ({ bookInfo, setBookInfo, setOpen, selectedBookISBN, triggerAlert }) => {
  const { getBookInfo } = useStorageHook();
  const [editingBook, setEditingBook] = useState(getBookInfo(selectedBookISBN));
  // ToDO: diffを取るロジックをカスタムフック内に作るのも視野、暫定これでも良い
  const isChanged = (JSON.stringify(editingBook) !== JSON.stringify(getBookInfo(selectedBookISBN))) && editingBook.title && editingBook.author;

  const handleEditOrDelete = (mode) => {
    const updateBookInfo = [...bookInfo];
    const index = bookInfo.findIndex(b => b.isbn === editingBook.isbn);
    if (mode === 'edit') {
      updateBookInfo[index] = { ...updateBookInfo[index], ...editingBook };
    } else if (mode === 'delete') {
      updateBookInfo.splice(index, 1);
    }
    triggerAlert(mode);
    setBookInfo(updateBookInfo);
    setOpen(false);
  };

  return (
    <ModalLayout setOpen={setOpen}>
      <img src={editingBook.image} alt={editingBook.title} style={{ paddingBottom: 16 }} />
      <BookFormFields initialBooks={editingBook} setInitialBooks={setEditingBook} />
      <ModalButtons setOpen={setOpen} require={isChanged} handlePositive={() => handleEditOrDelete('edit')} handleDelete={() => handleEditOrDelete('delete')} />
    </ModalLayout>
  );
}

export default EditModal;