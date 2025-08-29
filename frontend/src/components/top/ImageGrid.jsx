import { useState } from 'react'
import { Button, Grid } from '@mui/material';
import ControlModal from './ControlModal';
import { BOOK_SHADOW } from '../../constant';

const ImageGrid = ({ bookInfo, setBookInfo, sort, setAlert }) => {
  const [open, setOpen] = useState(false)
  const [inputBooks, setInputBooks] = useState({ title: '', author: '', date: '' });

  const handleEditOpen = (book) => {
    setOpen(true);
    setInputBooks({ title: book.title, author: book.author, date: book.date, image: book.image, isbn: book.isbn });
  };

  const modalProps = {
    modalMode: "edit",
    open,
    setOpen,
    setBookInfo,
    inputBooks,
    setInputBooks,
    setAlert
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
      <ControlModal {...modalProps} />
    </>
  )
}

export default ImageGrid;