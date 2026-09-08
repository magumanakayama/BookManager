// テストライブラリ
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// テスト対象
import useQuagga from './useQuagga';

// テスト用のモック作成関数
const testMethod = () => {
  const quaggaMock = {
    start: vi.fn(),
    stop: vi.fn(),
  };
  const viewport = document.createElement('div');

  return {
    onDetected: vi.fn(),
    quaggaMock: vi.fn(() => quaggaMock),
    viewport
  };
};

describe('useQuagga', () => {
  it('viewportが設定されるまでQuaggaを開始しない', () => {
    const { onDetected, quaggaMock } = testMethod();
    const { result } = renderHook(() => useQuagga(onDetected, quaggaMock));

    expect(quaggaMock).toHaveBeenCalledWith(onDetected, expect.any(Function));
    expect(quaggaMock().start).not.toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it('viewportが設定されるとQuaggaを開始する', () => {
    const { onDetected, quaggaMock, viewport } = testMethod();
    const { result } = renderHook(() => useQuagga(onDetected, quaggaMock));

    // ビューポート格納
    act(() => result.current.setViewport(viewport));

    expect(quaggaMock().start).toHaveBeenCalledTimes(1);
    expect(quaggaMock().start).toHaveBeenCalledWith(viewport);
  });

  it('アンマウント時にQuaggaを停止する', () => {
    const { onDetected, quaggaMock, viewport } = testMethod();
    const { result, unmount } = renderHook(() => useQuagga(onDetected, quaggaMock));

    // ビューポート格納 → フックをアンマウント
    act(() => result.current.setViewport(viewport));
    unmount();

    expect(quaggaMock().stop).toHaveBeenCalledTimes(1);
  });
});
