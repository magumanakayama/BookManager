import { useLocalStorage } from 'react-use';
import genDayString from './genDayString';

// カスタムフック：書籍ストレージ管理
const useStorageHook = () => {
  const [bookStorage, setBookStorage] = useLocalStorage('books', []);

  return {
    bookStorage,
    setBookStorage,
    getBookInfo: getBookInfo(bookStorage),
    submitBook: submitBook(bookStorage)(setBookStorage),
    deleteBook: deleteBook(bookStorage)(setBookStorage),
    sortBooks: sortBooks(bookStorage),
    editBook: editBook(bookStorage)(setBookStorage),
  };
};
export default useStorageHook;

// 書籍ストレージ操作関数群
//// 書籍取得
export const getBookInfo = (bookStorage) => (isbn) => bookStorage.find(book => book.isbn === isbn);
//// 登録
export const submitBook = (storage) => (dispatcher) => (book) => dispatcher([...storage, genBlankBook(book)]);
//// 編集
export const editBook = (storage) => (dispatcher) => (book) => {
  const { updateBookInfo, index } = common(storage)(book);
  updateBookInfo[index] = { ...updateBookInfo[index], ...book };
  dispatcher(updateBookInfo);
};
//// 削除
export const deleteBook = (storage) => (dispatcher) => (book) => {
  const { updateBookInfo, index } = common(storage)(book);
  updateBookInfo.splice(index, 1);
  dispatcher(updateBookInfo);
};
//// ソート
export const sortBooks = (bookStorage) => (type) => {
  const sortedBooks = {
    new: [...bookStorage].sort((a, b) => new Date(b.date) - new Date(a.date)),
    old: [...bookStorage].sort((a, b) => new Date(a.date) - new Date(b.date)),
    // title: [...bookStorage].sort((a, b) => a.title.localeCompare(b.title)),
    // author: [...bookStorage].sort((a, b) => a.author.localeCompare(b.author)),
    // 他のソート条件も追加可能
    off: [...bookStorage]
  };
  return sortedBooks[type];
};

//// diff取得
export const bookIsChanged = (original, edited) => JSON.stringify(original) !== JSON.stringify(edited);

// その他処理
//// 空本登録時の補完処理
const genBlankBook = (submitBook) => {
  const { title, author, date, largeImageUrl, isbn } = submitBook;
  return {
    title: title || 'タイトル不明',
    author: author || '著者不明',
    date: date || genDayString(),
    image: largeImageUrl || `https://placehold.jp/140x200.png?text=${encodeURIComponent(title || 'No Title')}`,
    isbn: isbn || String(Math.floor(Math.random() * 1e10)).padStart(10, '0')
  };
};

//// edit/Deleteの共通処理
const common = (storage) => (book) => {
  const updateBookInfo = [...storage];
  const index = storage.findIndex(b => b.isbn === book.isbn);
  return { updateBookInfo, index };
};