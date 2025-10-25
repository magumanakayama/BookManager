import { useState } from 'react';

const useAlertHook = () => {
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const triggerAlert = (category) => {
    if (!category) return;
    const { message, severity } = CATEGORIES[category];
    setAlert({ open: true, message, severity });
  };

  return { alert, triggerAlert, close: () => setAlert({ open: false, message: '', severity: '' }) };
};

export default useAlertHook;

export const CATEGORIES = {
  submit: { message: '書籍情報を登録しました', severity: 'success' },
  edit: { message: '書籍情報を更新しました', severity: 'success' },
  delete: { message: '書籍情報を削除しました', severity: 'success' },
  // error: { message: 'エラーが発生しました', severity: 'error' },
  // warning: { message: '警告メッセージ', severity: 'warning' },
};
