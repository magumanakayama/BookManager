import { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import React from 'react';
import AuthorModal from './AuthorModal';


const AuthorList = ({ bookInfo, sortedAuthors }) => {
  const [open, setOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  // Authorごとの代表的な本の画像を取得
  const BookImageList = sortedAuthors.map(({ author }, index) => {
    const bookImage = bookInfo.find((b) => b.author.replace(/\s+/g, '') === author).image;
    return { ...sortedAuthors[index], bookImage };
  });

  const blurProps = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(8px) brightness(0.7)',
    opacity: 0.7,
  };

  const handleOpen = (author) => {
    setOpen(true);
    setSelectedAuthor(author);
  };

  return (
    <>
      <List>
        {sortedAuthors.map(({ author, count }, index) => (
          <React.Fragment key={author}>
            <ListItem sx={{ overflow: 'hidden' }}>
              <Box sx={{ ...blurProps, backgroundImage: `url(${BookImageList[index].bookImage})` }} />
              <ListItemButton onClick={() => handleOpen(author)} sx={{ zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
                <ListItemText primary={author} secondary={`${count}冊`} />
                <img src={BookImageList[index].bookImage} alt={author} style={{ maxHeight: 104, display: 'block' }} />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      <AuthorModal open={open} setOpen={setOpen} blurProps={blurProps} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} bookInfo={bookInfo} />
    </>
  );
};

export default AuthorList;