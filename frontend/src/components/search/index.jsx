// 汎用コンポーネント
import FetchComponent from '../../lib/FetchComponent';

// カスタムコンポーネント
import SearchBox from './SearchBox';
import CardGrid from './CardGrid';
import SearchResultInfo from './SearchResultInfo';
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

  // ページ変更時のハンドラ
  // ToDo: 下層に移動できそう
  const handlePage = (value) => {
    setPage(value);
    beginRequest(requestUrl(value)); // 新しいページで検索
    window.scrollTo({ top: 0, behavior: 'auto' }); // ページの一番上までスクロール
  }

  // 検索成功時のレンダリング
  const RenderSuccess = ({ bookList }) => {
    // 検索結果が0件
    if (bookList?.Items?.length === 0) return <SearchResultInfo data={bookList} error />;
    // 検索結果が1件以上
    return <CardGrid bookList={bookList} page={page} handlePage={handlePage} />;
  }

  return (
    <>
      {/* 検索ボックス */}
      <SearchBox fetchInstance={fetchInstance} searchInstance={searchInstance} />
      {/* プロミス生成時にフェッチコンポーネントを生成 */}
      {booksPromise && (
        <FetchComponent
          promise={booksPromise}
          Success={(bookList) => <RenderSuccess bookList={bookList} />}
          Loading={() => <></>}
          Error={ErrorInfo}
        />
      )}
    </>
  );
};

export default BookSearch;