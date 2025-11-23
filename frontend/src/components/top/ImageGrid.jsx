import { useState } from 'react'
import { Button, Grid } from '@mui/material';
import EditModal from './modal/EditModal';
import CustomAlert from './CustomAlert';
import { BOOK_SHADOW } from '../../constant';
import useAlertHook from '../hook/alertHook';

const ImageGrid = ({ bookStorageInstance, sort }) => {
  const { getBookInfo, editBook, deleteBook, sortBooks } = bookStorageInstance;
  const { alert, close, triggerAlert } = useAlertHook();
  const [open, setOpen] = useState(false)
  const [selectedBookISBN, setSelectedBookISBN] = useState('');

  // 更新モーダルを開くハンドラー
  const handleEditOpen = (book) => {
    setOpen(true);
    setSelectedBookISBN(book.isbn);
  };

  // ボタン共通ハンドラー
  const commonHandler = (callback, alertType) => (book) => {
    callback(book);
    triggerAlert(alertType);
    setOpen(false);
  }

  // 書籍情報を取得
  const selectedBookInfo = getBookInfo(selectedBookISBN);

  // 更新モーダル用props
  const modalProps = {
    onClose: () => setOpen(false),
    selectedBookInfo,
    handleEdit: commonHandler(editBook, 'edit'),
    handleDelete: commonHandler(deleteBook, 'delete'),
  };

  return (
    <>
      <ContainerLayout>
        {sortBooks(sort).map(b => <BookItem key={b.isbn} book={b} onClick={handleEditOpen} />)}
      </ContainerLayout>
      {open && <EditModal {...modalProps} />}
      <CustomAlert alert={alert} close={close} />
    </>
  )
};

export default ImageGrid;

const ContainerLayout = ({ children }) => (
  <Grid container spacing={2} sx={{ width: '100dvw', px: 2 }}>
    {children}
  </Grid>
);

const BookItem = ({ book, onClick }) => (
  <Grid key={book.isbn} size={{ xs: 3, sm: 2, md: 1.5 }} >
    <Button onClick={() => onClick(book)} sx={{ p: 0, boxShadow: BOOK_SHADOW }} >
      <img src={book.image} alt={book.title} style={{ display: 'block', width: '100%' }} />
    </Button>
  </Grid>
);