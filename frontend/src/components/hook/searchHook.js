import { useState } from 'react';

const useSearch = () => {
  const [query, setQuery] = useState({ author: '', title: '' });
  const [prevQuery, setPrevQuery] = useState(query);
  const [booksPromise, setBooksPromise] = useState(null);
  const [loading, setLoading] = useState(false);

  return {
    query,
    setQuery,
    setPrevQuery,
    booksPromise,
    loading,
    diff: checkDiff(query, prevQuery),
    bookSearch: bookSearch(createUrl(query), setBooksPromise, setLoading),
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

  return `${BASE_URI}?${titleQuery}${and}${authorQuery}&${pageQuery}`;
};

// 書籍検索関数のカリー化
export const bookSearch = (createUrl, setBooksPromise, setLoading) => (page) => {
  setBooksPromise(fetchBooks(createUrl(page), () => setLoading(false)));
  setLoading(true);
};

// fetch実行関数
export const fetchBooks = async (request, func) => {
  const response = await fetch(request);
  if (!response.ok) throw new Error("Failed to fetch books");
  const data = await response.json();
  func();
  return data;
};