// MUI
import { TextField, Stack } from '@mui/material';

// 汎用コンポーネント
// ToDo: @から始まる絶対パスでインポートできるようにする
import { BackButton, FetchButton } from '../../lib/Buttons';

// 検索ボックスコンポーネント
const SearchBox = ({ fetchInstance, searchInstance }) => {
  return (
    <Stack direction="column" sx={{ m: 2 }} spacing={1}>
      <InputField searchInstance={searchInstance} />
      <SearchButtons fetchInstance={fetchInstance} searchInstance={searchInstance} />
    </Stack>
  );
};

export default SearchBox;

// 入力フィールド
const InputField = ({ searchInstance }) => {
  const { query, setQuery } = searchInstance;
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

// 検索用ボタン群
const SearchButtons = ({ fetchInstance, searchInstance }) => {
  // カスタムフックから必要なステート・関数を取得
  // promiseをstateかつキーにすることでuseを制御
  //// promiseが変数だとrequestが変わるたびに再レンダリングされてしまうため発火タイミング制御が難しくなる
  const { loading, beginRequest } = fetchInstance;
  const { query, page, setPrevQuery, diff, requestUrl } = searchInstance;

  console.log('SearchButtons loading:', loading);

  // 検索ボタン押下時のハンドラ
  const handleSearch = () => {
    setPrevQuery(query); // 前回の検索語句をステートに保存
    beginRequest(requestUrl(page)); // ページをセットし、フェッチを発火
  };

  // ToDo: ローディング表示にならないのを治す
  return (
    <Stack direction="row" justifyContent="flex-end" spacing={1}>
      <BackButton />
      <FetchButton loading={loading} onClick={handleSearch} disabled={!diff || loading} />
    </Stack>
  );
};