import { Button } from '@mui/material';
import { Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant';

const BookCard = ({ book, setSelectedBook, setOpen, handleSubmit }) => {
  const CARD_SIZE = 176;
  const CARD_MEDIA_SIZE = { height: 210, width: 148 };

  const navigate = useNavigate();
  const handleSubmitCustom = (submitBook) => {
    handleSubmit(submitBook);
    navigate(`${BASE_URL}/`)
  };

  const openDetailModal = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  return (
    <Card sx={{ width: CARD_SIZE }}>
      <CardActionArea onClick={() => openDetailModal(book)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          sx={{ height: CARD_MEDIA_SIZE.height, width: CARD_MEDIA_SIZE.width, mt: 2 }}
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
  );
}

export default BookCard;