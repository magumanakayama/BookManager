import { useState } from 'react';

const useSearch = () => {
  const [query, setQuery] = useState({ author: '', title: '' });
  const [prevQuery, setPrevQuery] = useState(query);

  return {
    query,
    setQuery,
    setPrevQuery,
    diff: checkDiff(query, prevQuery),
  };
};

export default useSearch;

// オブジェクトの差分チェック
export const checkDiff = (obj1, obj2) => JSON.stringify(obj1) !== JSON.stringify(obj2);
// URL作成関数のカリー化
export const createUrl = (query) => (page) => {
  const BASE_URI = 'https://8t6x3iucgd.execute-api.ap-northeast-1.amazonaws.com/default/myFunc';
  const { title, author } = query;
  const titleQuery = title ? `title=${title}` : '';
  const authorQuery = author ? `author=${author}` : '';
  const pageQuery = `page=${page}`;
  const and = title && author ? '&' : '';

  // デバッグ用URL、故意にエラーを発生させる
  // return 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=7777&title=%E5%A4%AA%E9%99%BD';
  return `${BASE_URI}?${titleQuery}${and}${authorQuery}&${pageQuery}`;
};