import { useState } from 'react'
import { Button, Grid } from '@mui/material';
import EditModal from './EditModal';

const ImageGrid = ({ bookInfo, handleSubmit, inputBooks, setInputBooks }) => {
  const [open, setOpen] = useState(false)

  const handleEditOpen = (book) => {
    setOpen(true);
    setInputBooks({ title: book.title, author: book.author, date: book.date, image: book.image });
  };

  const modalProps = {
    open,
    setOpen,
    handleSubmit,
    inputBooks,
    setInputBooks, // デバックプリセット専用
  };

  return (
    <>
      <Grid container spacing={2} sx={{ justifyContent: 'center', m: 2 }}>
        {bookInfo.map(book => (
          <Grid key={book.isbn}>
            <Button onClick={() => handleEditOpen(book)}>
              <img src={book.image} alt={book.title} style={{ display: 'block', width: '100%' }} />
            </Button>
          </Grid>
        ))}
      </Grid>
      <EditModal {...modalProps} />
    </>
  )
}

export default ImageGrid;