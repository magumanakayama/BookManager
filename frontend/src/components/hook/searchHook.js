import { useState } from 'react';

const useSearch = () => {
  const [query, setQuery] = useState({ keyword: '' });
  const [prevQuery, setPrevQuery] = useState(query);

  // ページネーション用のステート
  const [page, setPage] = useState(1);

  return {
    query,
    setQuery,
    page,
    setPage,
    setPrevQuery,
    diff: checkDiff(query, prevQuery),
    requestUrl: createUrl(query), // ページを受け取って、URL生成する関数
  };
};

export default useSearch;

// オブジェクトの差分チェック
export const checkDiff = (obj1, obj2) => JSON.stringify(obj1) !== JSON.stringify(obj2);
// URL作成関数のカリー化
export const createUrl = (query) => (page) => {
  const BASE_URI = 'https://8t6x3iucgd.execute-api.ap-northeast-1.amazonaws.com/default/myFunc';
  const { keyword } = query;
  const keywordQuery = keyword ? `keyword=${keyword}` : '';
  const pageQuery = `page=${page}`;

  return `${BASE_URI}?${keywordQuery}&${pageQuery}`;
};