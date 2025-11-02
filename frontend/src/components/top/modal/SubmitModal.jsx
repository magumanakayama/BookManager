import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';

const NEW_BOOK_TEMPLATE = { title: '', author: '', date: '', largeImageUrl: '', isbn: '' };

const SubmitModal = ({ setOpen, submitBook, triggerAlert }) => {
  const [book, setbook] = useState(NEW_BOOK_TEMPLATE);
  const isRequiredFilled = book.title && book.author;

  const handleSubmit = () => {
    submitBook(book);
    triggerAlert('submit');
    setOpen(false);
  };

  return (
    <ModalLayout setOpen={setOpen}>
      <BookFormFields book={book} setbook={setbook} />
      <ModalButtons setOpen={setOpen} require={isRequiredFilled} handlePositive={handleSubmit} />
    </ModalLayout>
  );
}

export default SubmitModal;