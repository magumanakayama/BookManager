import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';

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
    query: getParam(path, searchParams),
    naviAddUrl,
  };
};

export default useCustomParams;

export const getParam = (path, searchParams) => {
  if (path === '/') {
    return { key: 'sort', value: searchParams.get('sort') || 'new' };
  } else if (path === '/BookGraph') {
    return { key: 'mode', query: searchParams.get('mode') || 'author' };
  }
};

export const genUrl = (addPath = '/', query, value) => {
  return `${addPath}?${new URLSearchParams({ [query]: value })}`;
};
