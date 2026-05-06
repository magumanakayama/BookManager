import { useState, useEffect } from 'react';

const useFetchPromise = () => {
  const [fetchPromise, setFetchPromise] = useState(undefined);
  const [loading, setLoading] = useState(false);
  // ToDo: useEffectにurlを渡すためだけにステートになっている、本来ステートにする必要はないはず
  const [url, setUrl] = useState(undefined);

  // pendingUrlが変化したらfetchを発火（loading=trueのレンダリング後に実行される）
  //// useEffectにすることでloadingが更新されたタイミングでまず再レンダリングが走り、そのあとfetchが発火するようになる（loadingの変化による再レンダリングが上手くいかなかったのでこの処理にしている）
  useEffect(() => {
    if (!loading) return;
    setFetchPromise(fetchFunc(url));
    setUrl(undefined);
  }, [loading]);

  // fetch実行関数
  const fetchFunc = async (url) => {
    return fetch(url)
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
    beginRequest: (url) => {
      setLoading(true);
      setUrl(url); // useEffectでfetchを発火させる
    },
  };
};

export default useFetchPromise;