import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import React from 'react';
import { BOOK_SHADOW } from '../../constant';

const AuthorList = ({ bookInfo, sortedAuthors }) => {
  const BookImageList = sortedAuthors.map(([author,], index) => {
    const bookImage = bookInfo.find((b) => b.author.replace(/\s+/g, '') === author).image;
    return [...sortedAuthors[index], bookImage];
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

  return (
    <List>
      {sortedAuthors.map(([author, value], index) => (
        <React.Fragment key={author}>
          <ListItem sx={{ overflow: 'hidden' }}>
            <Box sx={{ ...blurProps, backgroundImage: `url(${BookImageList[index][2]})` }} />
            <Box sx={{ zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
              <ListItemText primary={author} secondary={`${value}冊`} />
              <img src={BookImageList[index][2]} alt={author} style={{ maxHeight: 104, display: 'block' }} />
            </Box>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default AuthorList;