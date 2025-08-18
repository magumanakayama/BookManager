import { useState } from 'react'
import { Box, Button, Grid } from '@mui/material';
import EditModal from './EditModal';

const ImageGrid = ({ bookInfo, setBookInfo, inputBooks, setInputBooks }) => {
  const [open, setOpen] = useState(false)

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
      <Grid container spacing={2} sx={{ width: '100dvw', px: 2 }}>
        {bookInfo.map(book => (
          <Grid key={book.isbn} size={{ xs: 3, sm: 2, md: 1.5 }} >
            <Button onClick={() => handleEditOpen(book)} sx={{ p: 0, boxShadow: 8 }} >
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