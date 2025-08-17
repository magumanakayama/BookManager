import { useState } from 'react'
import { Button, Grid, useMediaQuery } from '@mui/material';
import EditModal from './EditModal';

const ImageGrid = ({ bookInfo, setBookInfo, inputBooks, setInputBooks }) => {
  const [open, setOpen] = useState(false)

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleEditOpen = (book) => {
    setOpen(true);
    setInputBooks({ title: book.title, author: book.author, date: book.date, image: book.image, isbn: book.isbn });
  };

  const modalProps = {
    open,
    setOpen,
    setBookInfo,
    inputBooks,
    setInputBooks, // デバックプリセット専用
  };

  return (
    <>
      <Grid container spacing={isMobile ? 0 : 2} sx={{ justifyContent: 'center', m: 1 }}>
        {bookInfo.map(book => (
          <Grid key={book.isbn} size={{ xs: 3 }} >
            <Button onClick={() => handleEditOpen(book)}>
              <img src={book.image} alt={book.title} style={{ display: 'block', width: '100%' }} />
            </Button>
          </Grid>
        ))}
      </Grid >
      <EditModal {...modalProps} />
    </>
  )
}

export default ImageGrid;