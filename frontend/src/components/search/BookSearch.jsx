import { useState, useEffect } from 'react';
import { Button, Grid, Pagination } from '@mui/material';
import { Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../useFetch';
import DetailModal from './DetailModal'
import SearchBox from './SearchBox';
import SearchResultInfo from './SearchResultInfo';

import { BASE_URL } from '../../constant';

const BookSearch = ({ handleSubmit }) => {
  const [query, setQuery] = useState({ author: '', title: '', });
  const [searchUrl, setSearchUrl] = useState('');
  const [page, setPage] = useState(1);

  // detailModalのモーダルのオープン状態
  const [open, setOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null);

  const { data, loading, error } = useFetch(searchUrl);
  const pageCount = data?.pageCount || 0;

  const navigate = useNavigate();
  const handleSubmitCustom = (submitBook) => {
    handleSubmit(submitBook);
    navigate(`${BASE_URL}/`)
  };

  const handleSearch = () => {
    if (!query.title && !query.author) return;
    const titleQuery = query.title ? `title=${query.title}` : '';
    const authorQuery = query.author ? `author=${query.author}` : '';
    const pageQuery = `page=${page}`;
    const and = query.title && query.author ? '&' : '';
    setSearchUrl(`https://8t6x3iucgd.execute-api.ap-northeast-1.amazonaws.com/default/myFunc?${titleQuery}${and}${authorQuery}&${pageQuery}`);
  };

  const openDetailModal = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'auto' }); // ページの一番上までスクロール
  };

  // ステートの更新は非同期なのでhandlePageChangeの中でhandlesearchしても前のページが参照されうまくいかない
  // よってuseEffectが必須となる
  useEffect(() => handleSearch(), [page]);


  return (
    <>
      <SearchBox
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        loading={loading}
      />
      <Grid container spacing={1} sx={{ width: '100%', justifyContent: 'center' }}>
        {(data?.Items ?? []).map(book => (
          <Grid key={book.Item.isbn}>
            <Card sx={{ width: 176 }}>
              <CardActionArea onClick={() => openDetailModal(book)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{ height: 210, width: 148, mt: 2 }}
                  image={book.Item?.largeImageUrl}
                  alt={book.Item.title}
                />
                <CardContent>
                  {book.Item.title?.length > 8 ? `${book.Item.title.slice(0, 8)}...` : book.Item.title}
                  <p>{book.Item.author?.length > 8 ? `${book.Item.author.slice(0, 8)} ...` : book.Item.author || '著者不明'}</p>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" size="small" onClick={() => handleSubmitCustom(book.Item)}>登録</Button>
              </CardActions>
            </Card>
            {/* ToDo： サムネが無い場合は適当な画像を入れたい */}
            {/* ToDo： サイズ指定多すぎ */}
          </Grid>
        ))}
      </Grid>
      {(data?.Items?.length > 0) && <Pagination sx={{ display: "flex", justifyContent: 'center', mt: 2, mb: 6 }} count={pageCount} color="primary" onChange={(event, value) => handlePageChange(event, value)} />}
      <SearchResultInfo data={data} loading={loading} error={error} />
      <DetailModal open={open} setOpen={setOpen} book={selectedBook} handleSubmit={handleSubmit} />
    </>
  );
};

export default BookSearch;