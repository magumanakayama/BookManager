import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';
import { submitBook } from '../../hook/storageHook';

const NEW_BOOK_TEMPLATE = { title: '', author: '', date: '', largeImageUrl: '', isbn: '' };

const SubmitModal = ({ bookStorage, setBookStorage, setOpen, triggerAlert }) => {
  const [book, setBook] = useState(NEW_BOOK_TEMPLATE);
  const isRequiredFilled = book.title && book.author;
  const submitNewBook = submitBook(bookStorage)(setBookStorage);

  const handleSubmit = () => {
    submitNewBook(book);
    triggerAlert('submit');
    setOpen(false);
  };

  return (
    <ModalLayout setOpen={setOpen}>
      <BookFormFields book={book} setBook={setBook} />
      <ModalButtons setOpen={setOpen} require={isRequiredFilled} handlePositive={handleSubmit} />
    </ModalLayout>
  );
}

export default SubmitModal;