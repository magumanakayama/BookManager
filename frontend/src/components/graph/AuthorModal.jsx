import { Box, Button, Modal, List, ListItem, ListItemText } from '@mui/material';
import listFormatter from './listFormatter';


const AuthorModal = ({ open, setOpen, selectedAuthor, setSelectedAuthor, bookInfo }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    width: 280,
    p: 4,
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
        <List>
          {selectedAuthorBooks.map(book => (
            <ListItem key={book.id}>
              <ListItemText primary={book.title} secondary={book.author} primaryTypographyProps={{ sx: { color: 'blue' } }} secondaryTypographyProps={{ sx: { color: 'gray' } }} />
            </ListItem>
          ))}
        </List>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}

export default AuthorModal;