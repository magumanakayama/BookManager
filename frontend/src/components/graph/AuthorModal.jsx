import { Box, Button, Modal, List, ListItem, ListItemText } from '@mui/material';
import listFormatter from './listFormatterPie';
import { useRef, useLayoutEffect, useState } from 'react';
import MODAL_STYLE from '../../constant';


const AuthorModal = ({ open, setOpen, blurProps, selectedAuthor, setSelectedAuthor, bookInfo }) => {
  const buttonRef = useRef(null);
  const [listMaxHeight, setListMaxHeight] = useState('100%');

  const handleClose = () => {
    setOpen(false);
    setSelectedAuthor(null);
  };

  const { authorFormattedBookList } = listFormatter(bookInfo);
  const selectedAuthorBooks = authorFormattedBookList.filter(book => book.author.replace(/\s+/g, '') === selectedAuthor);


  // useLayoutEffect実行時にはrefがセットされていない可能性があるため、setTimeoutで遅延させrefセットを意図的に待つ(LayoutEffectとrefのどっちが早いかは明確にはわからないため暫定対応)
  useLayoutEffect(() => {
    if (open) {
      setTimeout(() => {
        if (buttonRef.current) {
          setListMaxHeight(`calc(100% - ${buttonRef.current.offsetHeight}px)`);
        }
      }, 0);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={MODAL_STYLE}>
        <Button ref={buttonRef} onClick={handleClose}>Close</Button>
        <Box sx={{ maxHeight: listMaxHeight, overflowY: 'auto' }}>
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