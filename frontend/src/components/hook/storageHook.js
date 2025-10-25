import { useLocalStorage } from 'react-use';
import generateTodayString from './generateTodayString';

const useStorageHook = () => {
  const [bookStorage, setBookStorage] = useLocalStorage('books', []);

  const handleSubmit = (submitBook, setAlert = () => { }) => {
    setBookStorage(makeBookInfo(submitBook, bookStorage));
    setAlert();
  }

  return { bookStorage, setBookStorage, handleSubmit, getBookInfo: getBookInfo(bookStorage) };
};

const makeBookInfo = (submitBook, bookStorage) => {
  const { title, author, date, largeImageUrl, isbn } = submitBook;
  return [
    ...bookStorage,
    {
      title: title || 'タイトル不明',
      author: author || '著者不明',
      date: date || generateTodayString(),
      image: largeImageUrl,
      isbn: isbn
    }
  ];
};

export default useStorageHook;

export const getBookInfo = (bookStorage) => (isbn) => bookStorage.find(book => book.isbn === isbn);
