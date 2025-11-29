import { TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import useSearch from '../hook/searchHook';
import FetchComponent from '../../lib/FetchComponent';
import CardGrid from './CardGrid';
import ErrorInfo from './SearchError';
import useFetchPromise from '../hook/fetch';
import { createUrl } from '../hook/searchHook';

const SearchBox = () => {
  // promiseをstateかつキーにすることでuseを制御
  //// promiseが変数だとrequestが変わるたびに再レンダリングされてしまうため発火タイミング制御が難しくなる
  const { query, setQuery, setPrevQuery, diff } = useSearch();
  const { fetchPromise: booksPromise, loading, setRequest } = useFetchPromise();
  const [page, setPage] = useState(1);
  const bookSearch = (page) => setRequest(createUrl(query)(page));

  const handleSearch = () => {
    setPrevQuery(query);
    bookSearch(page);
  };

  const handlePage = (value) => {
    setPage(value);
    bookSearch(value);
    window.scrollTo({ top: 0, behavior: 'auto' }); // ページの一番上までスクロール
  };

  return (
    <>
      <Stack direction="column" sx={{ m: 2 }} spacing={1}>
        <InputField query={query} setQuery={setQuery} />
        <Buttons loading={loading} handleSearch={handleSearch} query={query} setQuery={setQuery} isQueryChanged={diff} />
      </Stack>
      {booksPromise && (
        <FetchComponent
          promise={booksPromise}
          Success={(bookList) => <CardGrid bookList={bookList} page={page} handlePage={handlePage} />}
          Loading={() => <></>}
          Error={ErrorInfo}
        />
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

const Buttons = ({ loading, handleSearch, query, setQuery, isQueryChanged }) => {
  // ToDo: ローディング表示にならないのを治す
  console.log(loading ? 'Loading...' : 'Ready');
  return (
    <Stack direction="row" justifyContent="flex-end" spacing={1}>
      <Button variant="outlined" onClick={() => window.history.back()} >戻る</Button>
      <DebugButton query={query} setQuery={setQuery} />
      <Button variant="contained" loading={loading} loadingIndicator="検索中" onClick={handleSearch} disabled={!isQueryChanged} sx={{ width: 88 }}>検索</Button>
    </Stack>
  );
};

// デバッグ用ボタン
const DebugButton = ({ query, setQuery }) => (
  <Button variant="contained" onClick={() => setQuery({ ...query, author: '湊かなえ' })}>湊かなえ</Button>
);