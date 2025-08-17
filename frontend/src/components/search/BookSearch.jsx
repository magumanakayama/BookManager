import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../useFetch';
import DetailModal from './DetailModal'
import SearchBox from './SearchBox';

import { BASE_URL } from '../../constant';

const BookSearch = ({ handleSubmit }) => {
  const [query, setQuery] = useState({ author: '', title: '', });
  const [searchUrl, setSearchUrl] = useState('');

  // detailModalのモーダルのオープン状態
  const [open, setOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null);

  const { data, loading, error } = useFetch(searchUrl);

  const handleSearch = async () => {
    if (!query.title && !query.author) return;
    const titleQuery = query.title ? `title=${query.title}` : '';
    const authorQuery = query.author ? `author=${query.author}` : '';
    const and = query.title && query.author ? '&' : '';
    setSearchUrl(`https://8t6x3iucgd.execute-api.ap-northeast-1.amazonaws.com/default/myFunc?${titleQuery}${and}${authorQuery}`);
  };

  const openDetailModal = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const navigate = useNavigate();
  const handleSubmitCustom = (book) => {
    const mm = String(new Date().getMonth() + 1);
    const dd = String(new Date().getDate());
    handleSubmit(() => navigate(`${BASE_URL}/`), { title: book.Item.title, author: book.Item.author || '著者不明', date: `${mm}/${dd}`, image: book.Item.largeImageUrl, isbn: book.Item.isbn });
  };


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2, gap: 1 }}>
        <SearchBox
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          loading={loading}
        />
      </Box>
      {/* エラー表示 */}
      {error && (
        <Box sx={{ color: 'red', mt: 2 }}>
          {typeof error === 'string' ? error : '検索中にエラーが発生しました'}
        </Box>
      )}
      <Box sx={{ width: '100%', justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center', m: 2 }}>
          {(data?.Items ?? []).map(book => (
            <Grid key={book.Item.isbn}>
              <Card sx={{ width: 210, mb: 2 }}>
                <CardActionArea onClick={() => openDetailModal(book)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 210, width: 148, mt: 2 }} // 右に余白を追加
                    image={book.Item?.largeImageUrl}
                    alt={book.Item.title}
                  />
                  <CardContent>
                    {book.Item.title?.length > 10 ? `${book.Item.title.slice(0, 10)}...` : book.Item.title}
                    <p>{book.Item.author?.length > 10 ? `${book.Item.author.slice(0, 10)} ...` : book.Item.author || '著者不明'}</p>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button variant="contained" size="small" onClick={() => handleSubmitCustom(book)}>登録</Button>
                </CardActions>
              </Card>
              {/* ToDo： サムネが無い場合は適当な画像を入れたい */}
              {/* ToDo： サイズ指定多すぎ */}
            </Grid>
          ))}
        </Grid>
      </Box>
      <DetailModal open={open} setOpen={setOpen} book={selectedBook} handleSubmitCustom={handleSubmitCustom} />
    </Box>
  );
};

export default BookSearch;