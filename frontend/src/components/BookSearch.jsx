import { useState } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import { Card, CardContent, CardMedia, CardActions, CardActionArea, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFetch } from './useFetch';

import { BASE_URL } from '../constant';

const BookSearch = ({ handleSubmit }) => {
  const [keyword, setKeyword] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  const { data, loading, error } = useFetch(searchUrl);

  const handleSearch = async () => {
    if (!keyword) return;
    setSearchUrl(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}&maxResults=40`);
  };


  const navigate = useNavigate();
  const handleSubmitCustom = (book) => {
    const mm = String(new Date().getMonth() + 1);
    const dd = String(new Date().getDate());
    handleSubmit(() => navigate(`${BASE_URL}/`), { title: book.volumeInfo.title, author: book.volumeInfo.authors?.[0] || '著者不明', date: `${mm}/${dd}` });
  };


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <TextField
          label="書籍名で検索"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={handleSearch} sx={{ display: loading ? 'none' : 'block' }}>検索</Button>
        <CircularProgress sx={{ display: loading ? 'block' : 'none', ml: 1 }} />
      </Box>
      <Box sx={{ width: '100%', justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center', m: 2 }}>
          {(data?.items ?? []).map(book => (
            <Grid key={book.id}>
              <Card sx={{ width: 210, mb: 2 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 210, width: 148, mt: 2 }} // 右に余白を追加
                    image={book.volumeInfo.imageLinks?.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                  <CardContent>
                    {book.volumeInfo.title?.length > 10 ? `${book.volumeInfo.title.slice(0, 10)}...` : book.volumeInfo.title}
                    <p>{book.volumeInfo.authors?.length > 1 || book.volumeInfo.authors?.[0]?.length > 10 ? `${book.volumeInfo.authors[0].slice(0, 10)} ...` : book.volumeInfo.authors?.join(', ') || '著者不明'}</p>
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
    </Box>
  );
};

export default BookSearch;