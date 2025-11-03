import { TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import searchHook from '../hook/searchHook';
import SearchComponent from './SearchComponent';

const SearchBox = () => {
  const { query, setQuery, setPrevQuery, diff, createUrl } = searchHook();
  const [request, setRequest] = useState(null);
  const [page, setPage] = useState(1);
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    setPrevQuery(query);
    setSearching(true);
    setRequest(createUrl(page)); // keyを変えることで同じURLでも再レンダリングされるようにする、保険
  };

  return (
    <>
      <Stack direction="column" sx={{ m: 2 }} spacing={1}>
        <InputField query={query} setQuery={setQuery} />
        <Buttons handleSearch={handleSearch} query={query} setQuery={setQuery} isQueryChanged={diff} searching={searching} />
        {/* ToDo： サムネが無い場合は適当な画像を入れたい */}
      </Stack>
      {request && (
        <SearchComponent key={request} request={request} setPage={setPage} page={page} handleSearch={handleSearch} setSearching={setSearching} />
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

const Buttons = ({ handleSearch, query, setQuery, isQueryChanged, searching }) => (
  <Stack direction="row" justifyContent="flex-end" spacing={1}>
    <Button variant="outlined" onClick={() => window.history.back()} >戻る</Button>
    <DebugButton query={query} setQuery={setQuery} />
    <Button variant="contained" loading={searching} loadingIndicator="検索中" onClick={handleSearch} disabled={!isQueryChanged} sx={{ width: 88 }}>検索</Button>
  </Stack>
);

// デバッグ用ボタン
const DebugButton = ({ query, setQuery }) => (
  <Button variant="contained" onClick={() => setQuery({ ...query, author: '湊かなえ' })}>湊かなえ</Button>
);