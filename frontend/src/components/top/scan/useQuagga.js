import { useEffect, useState } from 'react';
import Quagga from '@ericblade/quagga2';

// カメラとバーコードスキャナーのカスタムフック
const useQuagga = (onDetected) => {
  // MUI Portal は useEffect 後に DOM へ挿入するため、コールバック ref で DOM 確定後に初期化する
  const [viewport, setViewport] = useState(null);
  const [error, setError] = useState(null);

  const config = {
    inputStream: {
      type: 'LiveStream', // ライブ映像を使用する
      target: viewport, // Quagga が video+canvas を注入する DOM 要素

      //// environment: 背面カメラ
      //// user: 前面カメラ
      constraints: { facingMode: { ideal: 'environment' } }
    },
    decoder: { readers: ['ean_reader'] }, // EAN バーコードを読み取る
    locate: true, // バーコード位置の特定用に画像解析をON
  };

  // Quagga初期化処理
  // ToDo: err部分と分割したい
  const init = (err, mounted) => {
    if (err) {
      if (mounted) {
        console.error(genMessage('camera', 'init_error'), err);
        setError('カメラを起動できませんでした: ' + (err.message || String(err)));
      }
      return;
    }
    if (!mounted) { stop(); return }; // アンマウント後に init が完了した場合はカメラを解放する
    console.log(genMessage('camera', 'init_success'));
    Quagga.start();
  };

  // Quagga停止処理
  const stop = () => { try { Quagga.stop(); } catch (_) { console.error(genMessage('quagga', 'stop_error'), _) } };

  useEffect(() => {
    if (!viewport) return;

    let mounted = true;

    // 初期化
    Quagga.init(
      config, // Quagga初期設定
      (err) => init(err, mounted) // 初期化時コールバック
    );

    // 検出時コールバック
    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      if (code) onDetected(code);
    });

    // アンマウント時のクリーンアップ
    return () => {
      mounted = false;
      Quagga.offDetected(); // onDetectedの登録解除
      stop();
    };
  }, [viewport]);

  return {
    // viewport,
    setViewport,
    error,
    // setError
  };
};

// メッセージ生成
const genMessage = (category, type) => {
  const PREFIX = '[BarcodeScanner]';
  const MESSAGE = {
    camera: {
      init_success: 'カメラ起動成功',
      init_error: 'カメラ起動失敗',
    },
    quagga: {
      stop_error: 'Quagga停止失敗',
    },
  };

  return `${PREFIX} ${MESSAGE[category][type]}`;
};

export default useQuagga;