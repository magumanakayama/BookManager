import { useState } from 'react';
import { Button, Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DetailModal from './DetailModal'
import { submitBook } from '../hook/storageHook';
import { CATEGORIES } from '../hook/alertHook';
import { BASE_URL } from '../../constant';

const QUERY_PARAMS = `${BASE_URL}/?alertOpen=true&severity=success&message=${encodeURIComponent(CATEGORIES.submit.message)}`;

const BookCard = ({ book }) => {
  const CARD_MEDIA_SIZE = { height: 210, width: 148 };
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (book) => {
    // ToDo: 関数等で切り出し
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const dispatcher = (b) => localStorage.setItem('books', JSON.stringify(b));

    submitBook(books)(dispatcher)(book);
    navigate(QUERY_PARAMS);
  };

  return (
    <>
      <CardLayout>
        <CardActionAreaComp onClick={() => setSelectedBook(book)} book={book} size={CARD_MEDIA_SIZE} />
        <CardActions sx={{ justifyContent: 'center' }}>
          <CardActionsButton onClick={() => handleSubmit(book)} name="登録" />
        </CardActions>
      </CardLayout>
      {selectedBook && <DetailModal setOpen={setSelectedBook} book={selectedBook} handleSubmit={handleSubmit} />}
    </>
  );
}

export default BookCard;

const CardLayout = ({ children }) => {
  const CARD_SIZE = 176;
  return <Card sx={{ width: CARD_SIZE }}>{children}</Card>;
};

const CardActionAreaComp = ({ onClick, book, size }) => {
  return (
    <CardActionArea onClick={onClick} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardMediaImage src={book.largeImageUrl} title={book.title} size={size} />
      <CardContent>
        {lengthCut(book.title, 8)}
        <p>{lengthCut(book.author, 8) || '著者不明'}</p>
      </CardContent>
    </CardActionArea>
  );
}

const CardMediaImage = ({ src, title, size }) => {
  return (
    <CardMedia
      component="img"
      sx={{ height: size.height, width: size.width, mt: 2 }}
      image={src}
      alt={title}
    />
  );
}

const CardActionsButton = ({ onClick, name }) => {
  return (
    <CardActions sx={{ justifyContent: 'center' }}>
      <Button variant="contained" size="small" onClick={onClick}>
        {name}
      </Button>
    </CardActions>
  );
};

const lengthCut = (text, maxLength) => text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
