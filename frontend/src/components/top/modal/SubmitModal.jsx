import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';
import { NEW_BOOK_TEMPLATE } from '../../../constant';

const SubmitModal = ({ handleSubmit, onClose }) => {
  const [book, setBook] = useState(NEW_BOOK_TEMPLATE);
  const isRequiredFilled = book.title && book.author;

  return (
    <ModalLayout onClose={onClose}>
      <BookFormFields book={book} setBook={setBook} />
      <ModalButtons
        onClose={onClose}
        require={isRequiredFilled} name="登録"
        handlePositive={() => handleSubmit(book)} />
    </ModalLayout>
  );
}

export default SubmitModal;