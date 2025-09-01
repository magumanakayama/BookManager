import { Box, Button, Modal, List, ListItem, ListItemText } from '@mui/material';
import listFormatter from './listFormatter';
import { useRef } from 'react';


const AuthorModal = ({ open, setOpen, blurProps, selectedAuthor, setSelectedAuthor, bookInfo }) => {
  const buttonRef = useRef(null);
  console.log(buttonRef);
  const modalStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bgcolor: 'background.paper',
    width: '100%',
    height: '100%',
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedAuthor(null);
  };

  const { authorFormattedBookList } = listFormatter(bookInfo);
  const selectedAuthorBooks = authorFormattedBookList.filter(book => book.author.replace(/\s+/g, '') === selectedAuthor);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Button ref={buttonRef} onClick={handleClose}>Close</Button>
        <Box sx={{ maxHeight: `calc(100% - ${buttonRef.current.offsetHeight}px)`, overflowY: 'auto' }}>
          <List>
            {selectedAuthorBooks.map((book) => (
              <ListItem key={book.isbn} sx={{ overflow: 'hidden' }}>
                <Box sx={{ ...blurProps, backgroundImage: `url(${book.image})` }} />
                <Box sx={{ zIndex: 1, display: 'flex', width: '100%', alignItems: 'center' }}>
                  <ListItemText primary={book.title} secondary={book.author} />
                  <img src={book.image} alt={book.title} style={{ maxHeight: 104, display: 'block' }} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Modal >
  );
}

export default AuthorModal;