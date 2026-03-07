// 汎用コンポーネント
import FetchComponent from '../../lib/FetchComponent';

// カスタムコンポーネント
import SearchBox from './SearchBox';
import CardGrid from './CardGrid';
import ErrorInfo from './SearchError';

// カスタムフック
import useFetchPromise from '../hook/fetch';
import useSearch from '../hook/searchHook';


// 本の検索コンポーネント
const BookSearch = () => {

  // フェッチの状態を管理
  const fetchInstance = useFetchPromise();
  const { fetchPromise: booksPromise, beginRequest } = fetchInstance;

  // 検索状態を管理
  const searchInstance = useSearch();
  const { page, setPage, requestUrl } = searchInstance;

  // ページ変更時のハンドラ\
  // ToDo: 下層に移動できそう
  const handlePage = (value) => {
    setPage(value);
    beginRequest(requestUrl(value)); // 新しいページで検索
    window.scrollTo({ top: 0, behavior: 'auto' }); // ページの一番上までスクロール
  }

  return (
    <>
      {/* 検索ボックス */}
      <SearchBox fetchInstance={fetchInstance} searchInstance={searchInstance} />
      {/* プロミス生成時にフェッチコンポーネントを生成 */}
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

export default BookSearch;