import { useState } from 'react'
import { Button, Grid } from '@mui/material';
import EditModal from './modal/EditModal';
import CustomAlert from '../CustomAlert';
import useAlertHook from '../hook/alertHook';
import { BOOK_SHADOW } from '../../constant';


const ImageGrid = ({ bookInfo, setBookInfo, sort }) => {
  const [open, setOpen] = useState(false)
  const [selectedBookISBN, setSelectedBookISBN] = useState('');
  const { alert, triggerAlert, close } = useAlertHook();

  const handleEditOpen = (book) => {
    setOpen(true);
    setSelectedBookISBN(book.isbn);
  };

  const modalProps = {
    setOpen,
    bookInfo,
    setBookInfo,
    selectedBookISBN,
    triggerAlert
  };

  const sortedList = {
    new: [...bookInfo].sort((a, b) => new Date(b.date) - new Date(a.date)),
    old: [...bookInfo].sort((a, b) => new Date(a.date) - new Date(b.date)),
    // title: [...bookInfo].sort((a, b) => a.title.localeCompare(b.title)),
    // author: [...bookInfo].sort((a, b) => a.author.localeCompare(b.author)),
    // 他のソート条件も追加可能
    off: [...bookInfo]
  };

  return (
    <>
      <Grid container spacing={2} sx={{ width: '100dvw', px: 2 }}>
        {(sortedList[sort]).map(book => (
          <Grid key={book.isbn} size={{ xs: 3, sm: 2, md: 1.5 }} >
            <Button onClick={() => handleEditOpen(book)} sx={{ p: 0, boxShadow: BOOK_SHADOW }} >
              <img src={book.image} alt={book.title} style={{ display: 'block', width: '100%' }} />
            </Button>
          </Grid>
        ))}
      </Grid >
      {open && <EditModal {...modalProps} />}
      <CustomAlert alert={alert} close={close} />
    </>
  )
}

export default ImageGrid;