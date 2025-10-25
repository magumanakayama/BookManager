import { useLocalStorage } from 'react-use';
import generateTodayString from './generateTodayString';

const useStorageHook = () => {
  const [bookStorage, setBookStorage] = useLocalStorage('books', []);

  const handleSubmit = (submitBook, setAlert = () => { }) => {
    setBookStorage(makeBookInfo(submitBook, bookStorage));
    // setAlert({ open: true, message: '書籍情報を登録しました', severity: 'success' });
  }

  return { bookStorage, setBookStorage, handleSubmit };
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
