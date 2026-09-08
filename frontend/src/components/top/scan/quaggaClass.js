// Quagga
import Quagga from '@ericblade/quagga2';

// Quagga2 を使用したバーコードスキャナーのクラスラッパー
class QuaggaClass {
  constructor(onDetected, setError) {
    if (typeof setError !== 'function') {
      throw new TypeError('setError must be a function');
    }

    this.viewport = null;
    this.onDetected = onDetected;
    this.setError = setError;
  }

  start(viewport) {
    this.viewport = viewport;
    Quagga.init(genConfig(viewport), (error) => this.initFunction(error, viewport));
  }

  stop() {
    Quagga.offDetected();
    Quagga.stop();

    this.viewport = null;
    this.onDetected = null;
    this.setError = null;
  }

  initFunction(error, viewport) {
    if (error) {
      if (viewport) {
        const message = genMessage('camera', 'init_error');
        console.error(message, error);
        this.setError(message);
      }
      return;
    }
    if (!this.viewport) { this.stop(); return }; // アンマウント後に init が完了した場合はカメラを解放する
    console.log(genMessage('camera', 'init_success'));
    Quagga.start();
  }
}

// Quagga初期化設定生成
const genConfig = (viewport) => ({
  inputStream: {
    type: 'LiveStream', // ライブ映像を使用する
    target: viewport, // Quagga が video+canvas を注入する DOM 要素

    //// environment: 背面カメラ
    //// user: 前面カメラ
    constraints: { facingMode: { ideal: 'environment' } }
  },
  decoder: { readers: ['ean_reader'] }, // EAN バーコードを読み取る
  locate: true, // バーコード位置の特定用に画像解析をON
});

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

export default QuaggaClass;