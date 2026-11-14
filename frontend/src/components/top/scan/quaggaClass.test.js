import { beforeEach, describe, expect, it, vi } from 'vitest';

// vi.mockが優先実行されるためホイスト
const quaggaMock = vi.hoisted(() => ({
  init: vi.fn(),
  offDetected: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
}));

vi.mock('@ericblade/quagga2', () => ({ default: quaggaMock }));

import QuaggaClass from './quaggaClass';

const testMethod = () => {
  const onDetected = vi.fn();
  const setError = vi.fn();
  const instance = new QuaggaClass(onDetected, setError);
  const viewport = document.createElement('div');

  return { instance, onDetected, setError, viewport };
};

describe('QuaggaClass', () => {
  beforeEach(() => vi.clearAllMocks());

  it('onDetectedが関数でない', () => expect(() => new QuaggaClass()).toThrow(new TypeError('onDetected must be a function')));
  it('setErrorが関数でない', () => expect(() => new QuaggaClass(vi.fn())).toThrow(new TypeError('setError must be a function')));

  it('viewportを設定してQuaggaを初期化する', () => {
    const { instance, viewport } = testMethod();
    instance.start(viewport);

    expect(quaggaMock.init).toHaveBeenCalledTimes(1);

    // ToDo:この確認はgenConfigで行うため、ここではコメントアウトしている
    // expect(quaggaMock.init).toHaveBeenCalledWith(
    //   {
    //     inputStream: {
    //       type: 'LiveStream',
    //       target: viewport,
    //       constraints: { facingMode: { ideal: 'environment' } },
    //     },
    //     decoder: { readers: ['ean_reader'] },
    //     locate: true,
    //   },
    //   expect.any(Function),
    // );
  });

  it('初期化成功時にQuaggaを開始する', () => {
    const { instance, viewport } = testMethod();

    instance.start(viewport);
    const initCallback = quaggaMock.init.mock.calls[0][1];
    initCallback(null);

    expect(quaggaMock.start).toHaveBeenCalledTimes(1);
  });

  it('初期化失敗時にエラーメッセージを通知する', () => {
    const { instance, setError, viewport } = testMethod();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { });

    instance.start(viewport);
    const initCallback = quaggaMock.init.mock.calls[0][1];
    initCallback(new Error('camera unavailable'));

    expect(setError).toHaveBeenCalledWith('[BarcodeScanner] カメラ起動失敗');
    expect(quaggaMock.start).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('停止後に初期化が完了した場合はQuaggaを開始せず停止処理を行う', () => {
    const { instance, viewport } = testMethod();

    instance.start(viewport);
    const initCallback = quaggaMock.init.mock.calls[0][1];
    instance.stop();
    initCallback(null);

    expect(quaggaMock.start).not.toHaveBeenCalled();
    expect(quaggaMock.offDetected).toHaveBeenCalledTimes(2);
    expect(quaggaMock.stop).toHaveBeenCalledTimes(2);
  });

  it('停止時にQuaggaを停止し参照を解放する', () => {
    const { instance, onDetected, setError } = testMethod();

    instance.stop();

    expect(quaggaMock.offDetected).toHaveBeenCalledTimes(1);
    expect(quaggaMock.stop).toHaveBeenCalledTimes(1);
    expect(instance.viewport).toBeNull();
    expect(instance.onDetected).toBeNull();
    expect(instance.setError).toBeNull();
    expect(onDetected).not.toHaveBeenCalled();
    expect(setError).not.toHaveBeenCalled();
  });
});