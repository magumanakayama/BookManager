import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';

export const QUERY_PARAMS = {
  ['/']: {
    key: 'sort',
    default: 'new',
  },
  ['/BookGraph']: {
    key: 'mode',
    default: 'author',
  },
};

const useCustomParams = () => {
  const navigate = useNavigate();

  // URLのパスを取得
  const path = useLocation().pathname;

  // クエリパラメータを取得
  const [searchParams] = useSearchParams();

  // 以下を付与したURLへnavigateする関数
  //// '/' 以降の追加パス、クエリパラメータキー
  //// クエリパラメータ値
  const naviAddUrl = (path, key) => (value) => {
    const url = genUrl(path, key, value);
    navigate(url, { replace: true }); // replace：trueで、ブラウザの履歴を残さないようにする
  };

  return {
    path,
    query: getQuery(path, searchParams),
    naviAddUrl,
  };
};

export default useCustomParams;

export const getQuery = (path, searchParams) => {
  const querys = {
    key: QUERY_PARAMS[path].key,
    value: searchParams.get(QUERY_PARAMS[path].key) ?? QUERY_PARAMS[path].default,
  };
  return querys;
};

export const genUrl = (addPath = '/', query, value) => {
  return `${addPath}?${new URLSearchParams({ [query]: value })}`;
};
