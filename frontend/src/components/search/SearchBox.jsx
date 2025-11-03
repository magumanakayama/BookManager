import { TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import useSearch from '../hook/searchHook';
import SearchComponent from './SearchComponent';

const SearchBox = () => {
  // promiseをstateかつキーにすることでuseを制御
  //// promiseが変数だとrequestが変わるたびに再レンダリングされてしまうため発火タイミング制御が難しくなる
  const { query, setQuery, setPrevQuery, booksPromise, loading, diff, bookSearch } = useSearch();
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    setPrevQuery(query);
    bookSearch(page);
  };

  return (
    <>
      <Stack direction="column" sx={{ m: 2 }} spacing={1}>
        <InputField query={query} setQuery={setQuery} />
        <Buttons loading={loading} loadingIndicator={'検索中'} handleSearch={handleSearch} query={query} setQuery={setQuery} isQueryChanged={diff} />
      </Stack>
      {booksPromise && (
        <SearchComponent key={booksPromise} promise={booksPromise} setPage={setPage} page={page} bookSearch={bookSearch} />
      )}
    </>
  );
};

export default SearchBox;

const InputField = ({ query, setQuery }) => {
  const queryToLabel = {
    title: 'タイトル',
    author: '著者',
    // 他のフィールドのラベルもここに追加
  };

  return (
    <Stack direction="row" spacing={1}>
      {Object.keys(query).map(key => (
        <TextField
          key={key}
          label={queryToLabel[key]}
          value={query[key]}
          onChange={e => setQuery({ ...query, [key]: e.target.value })}
          size="small"
        />
      ))}
    </Stack>
  );
};

const Buttons = ({ loading, handleSearch, query, setQuery, isQueryChanged }) => (
  <Stack direction="row" justifyContent="flex-end" spacing={1}>
    <Button variant="outlined" onClick={() => window.history.back()} >戻る</Button>
    <DebugButton query={query} setQuery={setQuery} />
    <Button variant="contained" loading={loading} loadingIndicator="検索中" onClick={handleSearch} disabled={!isQueryChanged} sx={{ width: 88 }}>検索</Button>
  </Stack>
);

// デバッグ用ボタン
const DebugButton = ({ query, setQuery }) => (
  <Button variant="contained" onClick={() => setQuery({ ...query, author: '湊かなえ' })}>湊かなえ</Button>
);