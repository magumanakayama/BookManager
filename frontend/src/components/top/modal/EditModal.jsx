import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';
import { getBookInfo, editBook, deleteBook } from '../../hook/storageHook';

const EditModal = ({ bookStorage, setBookStorage, setOpen, selectedBookISBN, triggerAlert }) => {
  // フック関数を部分適用
  const selectedBookInfo = () => getBookInfo(bookStorage)(selectedBookISBN);
  const editSelectedBook = editBook(bookStorage)(setBookStorage);
  const deleteSelectedBook = deleteBook(bookStorage)(setBookStorage);

  const [editingBook, setEditingBook] = useState(selectedBookInfo());
  // ToDo: diffを取るロジックをカスタムフック内に作るのも視野、暫定これでも良い
  const isChanged = (JSON.stringify(editingBook) !== JSON.stringify(selectedBookInfo())) && editingBook.title && editingBook.author;
  // 更新ハンドラー
  const handleEdit = () => {
    editSelectedBook(editingBook);
    triggerAlert('edit');
    setOpen(false);
  }
  // 削除ハンドラー
  const handleDelete = () => {
    deleteSelectedBook(editingBook);
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