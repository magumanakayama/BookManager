import { useState } from 'react';
import DetailModal from './DetailModal'
import SearchBox from './SearchBox';
import createUrl from './createUrl';
import SearchComponent from './SearchComponent';


const BookSearch = () => {
  const [query, setQuery] = useState({ author: '', title: '' });
  const [request, setRequest] = useState(null);
  const [page, setPage] = useState(1);

  // detailModalのモーダルのオープン状態
  const [open, setOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    setSearching(true);
    setRequest(createUrl(query, page)); // keyを変えることで同じURLでも再レンダリングされるようにする、保険
  };


  return (
    <>
      <SearchBox query={query} setQuery={setQuery} handleSearch={handleSearch} searching={searching} />
      {request && (
        <SearchComponent request={request} setSelectedBook={setSelectedBook} setOpen={setOpen} setPage={setPage} page={page} handleSearch={handleSearch} setSearching={setSearching} />
      )}
      <DetailModal open={open} setOpen={setOpen} book={selectedBook} />
    </>
  );
};

export default BookSearch;