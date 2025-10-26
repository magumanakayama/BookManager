import { useState } from 'react';
import ModalLayout from './ModalLayout';
import BookFormFields from './BookFormFields';
import ModalButtons from './ModalButtons';

const NEW_BOOK_TEMPLATE = { title: '', author: '', date: '', largeImageUrl: '', isbn: '' };

const SubmitModal = ({ setOpen, handleSubmit, triggerAlert }) => {
  const [initialBooks, setInitialBooks] = useState(NEW_BOOK_TEMPLATE);
  const isRequiredFilled = initialBooks.title && initialBooks.author;

  const handleSubmitCustom = () => {
    const dummyImage = `https://placehold.jp/140x200.png?text=${encodeURIComponent(initialBooks.title || 'No Title')}`;
    const randomIsbn = String(Math.floor(Math.random() * 1e10)).padStart(10, '0');
    handleSubmit({ ...initialBooks, largeImageUrl: dummyImage, isbn: randomIsbn }, triggerAlert('submit'));
    setOpen(false);
  };

  return (
    <ModalLayout setOpen={setOpen}>
      <BookFormFields initialBooks={initialBooks} setInitialBooks={setInitialBooks} />
      <ModalButtons setOpen={setOpen} require={isRequiredFilled} handlePositive={handleSubmitCustom} />
    </ModalLayout>
  );
}

export default SubmitModal;