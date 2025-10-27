import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useAlertHook = () => {
  // クエリパラメータの取得
  const [searchParams] = useSearchParams();
  const alertOpen = searchParams.get('alertOpen') ?? false;
  const message = searchParams.get('message') ?? '';
  const severity = searchParams.get('severity') ?? '';
  const [alert, setAlert] = useState({ open: alertOpen, message, severity });

  // 画面リロード時にクエリパラメータを消す
  useEffect(() => {
    if (window.location.search) window.history.replaceState({}, '', window.location.pathname);
  }, []);

  return { alert, triggerAlert: triggerAlert(setAlert), close: () => setAlert({ open: false, message: '', severity: '' }) };
};

export default useAlertHook;

export const triggerAlert = (dispatcher) => (category) => {
  if (!category) return;
  const { message, severity } = CATEGORIES[category];
  dispatcher({ open: true, message, severity });
};

export const CATEGORIES = {
  submit: { message: '書籍情報を登録しました', severity: 'success' },
  edit: { message: '書籍情報を更新しました', severity: 'success' },
  delete: { message: '書籍情報を削除しました', severity: 'success' },
  // error: { message: 'エラーが発生しました', severity: 'error' },
  // warning: { message: '警告メッセージ', severity: 'warning' },
};
