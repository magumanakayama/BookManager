import { useState } from 'react';
import { Button, Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
import { submitBook } from '../hook/storageHook';
import { useNavigate } from 'react-router-dom';
import DetailModal from './DetailModal'
import { BASE_URL } from '../../constant';

const QUERY_PARAMS = `${BASE_URL}/?alertOpen=true&severity=success&message=登録が完了しました`;

const BookCard = ({ book }) => {
  const CARD_MEDIA_SIZE = { height: 210, width: 148 };
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (book) => {
    // ToDo: 関数等で切り出し
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const dispatcher = (b) => localStorage.setItem('books', JSON.stringify(b));

    submitBook(books, dispatcher)(book);
    navigate(QUERY_PARAMS);
  };
  const openDetailModal = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  return (
    <>
      <CardLayout>
        <CardActionArea onClick={() => openDetailModal(book)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardMediaImage src={book.Item.largeImageUrl} title={book.Item.title} size={CARD_MEDIA_SIZE} />
          <CardContent>
            {lengthCut(book.Item.title, 8)}
            <p>{lengthCut(book.Item.author, 8) || '著者不明'}</p>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }}>
          <CardActionsButton onClick={() => handleSubmit(book.Item)} name="登録" />
        </CardActions>
      </CardLayout>
      {open && <DetailModal setOpen={setOpen} book={selectedBook} handleSubmit={handleSubmit} />}
    </>
  );
}

export default BookCard;

const CardLayout = ({ children }) => {
  const CARD_SIZE = 176;
  return <Card sx={{ width: CARD_SIZE }}>{children}</Card>;
};

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
