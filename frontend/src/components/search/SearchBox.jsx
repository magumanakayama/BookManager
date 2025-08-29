import { TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';

const SearchBox = ({ query, setQuery, handleSearch, loading }) => {
  const [prevQuery, setPrevQuery] = useState(JSON.stringify(query));
  const isQueryChanged = JSON.stringify(query) !== prevQuery;

  const handleSearchCustom = () => {
    setPrevQuery(JSON.stringify(query));
    handleSearch();
  }

  return (
    <Stack direction="column" sx={{ m: 2 }} spacing={1}>
      <Stack direction="row" spacing={1}>
        {Object.keys(query).map(key => (
          <TextField
            key={key}
            label={key === 'title' ? 'タイトル' : key === 'author' ? '著者' : key}
            value={query[key]}
            onChange={e => setQuery({ ...query, [key]: e.target.value })}
            size="small"
          />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button variant="outlined" onClick={() => window.history.back()} >戻る</Button>
        <Button variant="contained" onClick={() => setQuery({ ...query, author: '湊かなえ' })}>湊かなえ</Button>
        <Button variant="contained" loading={loading} loadingIndicator="検索中" onClick={handleSearchCustom} disabled={!isQueryChanged} sx={{ width: 88 }}>検索</Button>
      </Stack>
    </Stack>
  );
};

export default SearchBox;
