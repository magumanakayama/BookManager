import { useState } from 'react';

const useFetchPromise = () => {
  const [fetchPromise, setFetchPromise] = useState(undefined);
  const [loading, setLoading] = useState(false);

  // fetch実行関数
  const fetchWithLoading = async (request) => {
    setLoading(true);
    return fetch(request)
      .then(res => {
        // レスポンスがエラーの場合はエラーをスロー
        if (!res.ok) throw new Error('Network response was not ok', { cause: res });
        return res.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err.cause.json()
          .then(errorData => {
            throw new Error('Fetch error', { cause: { status: err.cause.status, body: errorData } });
          })
      })
      .finally(() => setLoading(false));
  };

  return {
    fetchPromise,
    loading,
    beginRequest: (request) => setFetchPromise(fetchWithLoading(request)),
  };
};

export default useFetchPromise;