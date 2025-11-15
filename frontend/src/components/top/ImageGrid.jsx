import { useState } from 'react'
import { Button, Grid } from '@mui/material';
import EditModal from './modal/EditModal';
import CustomAlert from './CustomAlert';
import { BOOK_SHADOW } from '../../constant';
import { sortBooks } from '../hook/storageHook';
import useAlertHook from '../hook/alertHook';

const ImageGrid = ({ bookStorage, setBookStorage, sort }) => {
  const { alert, close, triggerAlert } = useAlertHook();
  const [open, setOpen] = useState(false)
  const [selectedBookISBN, setSelectedBookISBN] = useState('');
  const handleEditOpen = (book) => {
    setOpen(true);
    setSelectedBookISBN(book.isbn);
  };

  const modalProps = {
    bookStorage,
    setBookStorage,
    setOpen,
    selectedBookISBN,
    triggerAlert
  };

  return (
    <>
      <ContainerLayout>
        {(sortBooks(bookStorage)(sort)).map(book => <BookItem key={book.isbn} book={book} onClick={handleEditOpen} />)}
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