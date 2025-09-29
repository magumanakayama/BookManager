import { useState } from 'react';
import DetailModal from './DetailModal'
import SearchBox from './SearchBox';
import createUrl from './createUrl';
import SearchComponent from './SearchComponent';


const BookSearch = ({ handleSubmit }) => {
  const [query, setQuery] = useState({ author: '', title: '' });
  const [request, setRequest] = useState(null);
  const [page, setPage] = useState(1);

  // detailModalのモーダルのオープン状態
  const [open, setOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null);
  const handleSearch = () => setRequest(createUrl(query, page));

  return (
    <>
      {/* <SearchBox query={query} setQuery={setQuery} handleSearch={handleSearch} loading={loading} /> */}
      <SearchBox query={query} setQuery={setQuery} handleSearch={handleSearch} />
      {request && (
        <SearchComponent request={request} setSelectedBook={setSelectedBook} setOpen={setOpen} handleSubmit={handleSubmit} setPage={setPage} page={page} handleSearch={handleSearch} />
      )}
      <DetailModal open={open} setOpen={setOpen} book={selectedBook} handleSubmit={handleSubmit} />
    </>
  );
};

export default BookSearch;