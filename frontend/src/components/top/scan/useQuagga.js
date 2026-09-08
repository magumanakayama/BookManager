import { useEffect, useState } from 'react';
import QuaggaClass from './quaggaClass';

// カメラとバーコードスキャナーのカスタムフック
const useQuagga = (onDetected, Quagga = QuaggaClass) => {
  // MUI Portal は useEffect 後に DOM へ挿入するため、コールバック ref で DOM 確定後に初期化する
  const [viewport, setViewport] = useState(null);
  const [error, setError] = useState(null);

  // QuaggaClass
  const quaggaInstnace = new Quagga(onDetected, setError);

  useEffect(() => {
    if (!viewport) return;
    quaggaInstnace.start(viewport);

    // アンマウント時のクリーンアップ
    return () => { quaggaInstnace.stop(); };
  }, [viewport]);

  return {
    // viewport,
    setViewport,
    error,
    // setError
  };
};

export default useQuagga;