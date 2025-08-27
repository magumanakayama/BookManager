import { List, ListItem, ListItemText, Divider } from '@mui/material';
import React from 'react';

const AuthorList = ({ bookInfo, sortedAuthors }) => {
  const BookImageList = sortedAuthors.map(([author,], index) => {
    const bookImage = bookInfo.find((b) => b.author.replace(/\s+/g, '') === author).image;
    return [...sortedAuthors[index], bookImage];
  });

  console.log(BookImageList);


  return (
    <>
      <Divider variant="middle" components="li" />
      <List>
        {sortedAuthors.map(([author, value], index) => (
          <React.Fragment key={author}>
            <ListItem>
              <ListItemText primary={author} secondary={`${value}冊`} primaryTypographyProps={{ sx: { color: '#1976d2' } }} secondaryTypographyProps={{ sx: { color: '#d32f2f' } }} />
              <img src={BookImageList[index][2]} alt={author} style={{ maxHeight: 104 }} />
            </ListItem>
            <Divider variant="middle" components="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default AuthorList;
