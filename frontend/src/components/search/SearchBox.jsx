import { TextField, Button, CircularProgress, Stack } from '@mui/material';

const SearchBox = ({ query, setQuery, handleSearch, loading }) => {
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
      {/* <Button variant="contained" onClick={() => setQuery({ ...query, title: '告白', author: '湊かなえ' })}>デバックプリセット</Button> */}
      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button variant="outlined" onClick={() => window.history.back()} >戻る</Button>
        <Button variant="contained" onClick={() => setQuery({ ...query, author: '湊かなえ' })}>湊かなえ</Button>
        <Button variant="contained" onClick={handleSearch} sx={{ display: loading ? 'none' : 'block' }}>検索</Button>
        <CircularProgress sx={{ display: loading ? 'block' : 'none', ml: 1 }} />
      </Stack>
    </Stack>
  );
};

export default SearchBox;
