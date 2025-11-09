import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant';

const useCustomParams = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // navigateを純粋関数に切り出せないため、カスタムフック内でラップする
  const genNavigate = (query) => (addPath) => (value) => {
    navigate(genUrl(query)(value)(addPath), { replace: true });
  };

  return {
    path,
    getParam: () => getParam(path)(searchParams),
    genNavigate,
  };
};

export default useCustomParams;

// パスを取得して、対応するクエリパラメータの値を返す関数
export const getParam = (path) => (searchParams) => {
  if (path === BASE_URL) {
    return { val: searchParams.get('sort') || 'new', path: path };
  } else if (path === BASE_URL + '/BookGraph') {
    return { val: searchParams.get('mode') || 'author', path: path };
  }
};

export const genUrl = (query) => (value) => (addPath = '') => {
  return `${BASE_URL}${addPath}?${new URLSearchParams({ [query]: value })}`;
};
