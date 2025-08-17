import { TextField, Button, CircularProgress } from '@mui/material';

const SearchBox = ({ query, setQuery, handleSearch, loading }) => {
  return (
    <>
      {Object.keys(query).map(key => (
        <TextField
          key={key}
          label={key === 'title' ? 'タイトル' : key === 'author' ? '著者' : key}
          value={query[key]}
          onChange={e => setQuery({ ...query, [key]: e.target.value })}
          size="small"
        />
      ))}
      {/* <Button variant="contained" onClick={() => setQuery({ ...query, title: '告白', author: '湊かなえ' })}>デバックプリセット</Button> */}
      <Button variant="contained" onClick={() => setQuery({ ...query, author: '湊かなえ' })}>デバックプリセット2</Button>
      <Button variant="contained" onClick={handleSearch} sx={{ display: loading ? 'none' : 'block' }}>検索</Button>
      <CircularProgress sx={{ display: loading ? 'block' : 'none', ml: 1 }} />
    </>
  );
};

export default SearchBox;
