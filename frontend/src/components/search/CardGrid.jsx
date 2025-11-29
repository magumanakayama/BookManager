import { Grid, Pagination } from '@mui/material';
import BookCard from './BookCard';

const CardGrid = ({ bookList, page, handlePage }) => {
  const pageCount = bookList?.pageCount || 0;
  return (
    <>
      <Grid container spacing={1} sx={{ width: '100%', justifyContent: 'center' }}>
        {(bookList?.Items ?? []).map(book => (
          <Grid key={book.Item.isbn}>
            <BookCard book={book.Item} />
          </Grid>
        ))}
      </Grid>
      {(bookList?.Items?.length > 0) &&
        <Pagination sx={{ display: "flex", justifyContent: 'center', mt: 2, mb: 6 }} page={page} count={pageCount} onChange={(_, value) => handlePage(value)} />
      }
    </>
  );
};

export default CardGrid;