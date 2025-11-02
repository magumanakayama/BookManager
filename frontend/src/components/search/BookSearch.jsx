import { useState } from 'react';
import SearchBox from './SearchBox';
import createUrl from './createUrl';
import SearchComponent from './SearchComponent';

const BookSearch = () => {
  const [query, setQuery] = useState({ author: '', title: '' });
  const [request, setRequest] = useState(null);
  const [page, setPage] = useState(1);
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    setSearching(true);
    setRequest(createUrl(query, page)); // keyを変えることで同じURLでも再レンダリングされるようにする、保険
  };

  return (
    <>
      <SearchBox query={query} setQuery={setQuery} handleSearch={handleSearch} searching={searching} />
      {request && (
        <SearchComponent request={request} setPage={setPage} page={page} handleSearch={handleSearch} setSearching={setSearching} />
      )}
    </>
  );
};

export default BookSearch;