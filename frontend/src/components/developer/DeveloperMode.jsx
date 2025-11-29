import { useEffect, useState } from 'react';

const DeveloperMode = () => {
  const [buildInfo, setBuildInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/build-info.json')
      .then((res) => {
        if (!res.ok) throw new Error('取得に失敗しました');
        return res.json();
      })
      .then((data) => setBuildInfo(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Developer Mode</h1>
      <p>build-info.json の内容:</p>
      {error && <div style={{ color: 'red' }}>エラー: {error}</div>}
      {buildInfo ? (
        <pre>{JSON.stringify(buildInfo, null, 2)}</pre>
      ) : (
        !error && <div>読み込み中...</div>
      )}
    </div>
  );
};

export default DeveloperMode;