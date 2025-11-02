import { useEffect } from 'react';
import { useFetch } from '../useFetch';
import { Grid, Pagination } from '@mui/material';
import SearchResultInfo from './SearchResultInfo';
import BookCard from './BookCard';

const SearchComponent = ({ request, setPage, page, handleSearch, setSearching }) => {
  const { data, loading, error } = useFetch(request);
  const pageCount = data?.pageCount || 0;

  const handlePageChange = (value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'auto' }); // ページの一番上までスクロール
  };

  // ステートの更新は非同期なのでhandlePageChangeの中でhandlesearchしても前のページが参照されうまくいかない
  // よってuseEffectが必須となる
  useEffect(() => handleSearch(), [page]);

  useEffect(() => {
    // !loadingだと false→undefinedの時にも反応してしまう
    if (loading == false) setSearching(false);
  }, [loading]);


  return (
    <>
      <SearchResultInfo data={data} loading={loading} error={error} />
      <Grid container spacing={1} sx={{ width: '100%', justifyContent: 'center' }}>
        {(data?.Items ?? []).map(book => (
          <Grid key={book.Item.isbn}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
      {(data?.Items?.length > 0) && <Pagination sx={{ display: "flex", justifyContent: 'center', mt: 2, mb: 6 }} count={pageCount} color="primary" onChange={(_, value) => handlePageChange(value)} />}
    </>
  )
}

export default SearchComponent;