import { useLocalStorage } from 'react-use';
import generateTodayString from './generateTodayString';

const useStorageHook = () => {
  const [bookStorage, setBookStorage] = useLocalStorage('books', []);

  return {
    bookStorage,
    setBookStorage,
    getBookInfo: getBookInfo(bookStorage),
    submitBook: submitBook(bookStorage, setBookStorage),
    editBook: editBook(bookStorage, setBookStorage),
    deleteBook: deleteBook(bookStorage, setBookStorage),
  };
};
export default useStorageHook;

export const getBookInfo = (bookStorage) => (isbn) => bookStorage.find(book => book.isbn === isbn);
export const submitBook = (storage, dispatcher) => (book) => dispatcher(genBlankBook(book, storage));
export const editBook = (storage, dispatcher) => (book) => {
  const { updateBookInfo, index } = common(storage, book);
  updateBookInfo[index] = { ...updateBookInfo[index], ...book };
  dispatcher(updateBookInfo);
};
export const deleteBook = (storage, dispatcher) => (book) => {
  const { updateBookInfo, index } = common(storage, book);
  updateBookInfo.splice(index, 1);
  dispatcher(updateBookInfo);
};

// 空本登録時の補完処理
const genBlankBook = (submitBook, bookStorage) => {
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

// edit/Deleteの共通処理
const common = (storage, book) => {
  const updateBookInfo = [...storage];
  const index = storage.findIndex(b => b.isbn === book.isbn);
  return { updateBookInfo, index };
};