import { use, Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { Box, Grid, Pagination } from '@mui/material';
import BookCard from './BookCard';

const SearchComponent = ({ promise, setPage, page, bookSearch }) => {
  const handlePage = (value) => {
    setPage(value);
    bookSearch(value);
    window.scrollTo({ top: 0, behavior: 'auto' }); // ページの一番上までスクロール
  };

  return (
    <>
      <ErrorBoundary fallback={<ResultInfo />}>
        <Suspense fallback={<></>}>
          <CardGrid promise={promise} page={page} handlePage={handlePage} />
        </Suspense>
      </ErrorBoundary >
    </>
  )
}

export default SearchComponent;

const CardGrid = ({ promise, page, handlePage }) => {
  const data = use(promise);
  const pageCount = data?.pageCount || 0;
  return (
    <>
      <Grid container spacing={1} sx={{ width: '100%', justifyContent: 'center' }}>
        {(data?.Items ?? []).map(book => (
          <Grid key={book.Item.isbn}>
            <BookCard book={book.Item} />
          </Grid>
        ))}
      </Grid>
      {(data?.Items?.length > 0) &&
        <Pagination sx={{ display: "flex", justifyContent: 'center', mt: 2, mb: 6 }} page={page} count={pageCount} onChange={(_, value) => handlePage(value)} />
      }
    </>
  );
};

const ResultInfo = () => <Box sx={{ color: 'red', mt: 2 }}>検索中にエラーが発生しました</Box>;
