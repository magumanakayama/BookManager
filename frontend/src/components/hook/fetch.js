// 受け取ったリクエストをプロミスに渡し、ステートにセットする関数
export const setPromiseState = (promise, setPromise) => (request) => {
  setPromise(promise(request));
};

// fetch実行関数
export const fetchWithCallback = (callback = () => { }) => async (request) => {
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
    .finally(() => callback());
};
