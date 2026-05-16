import { useRef } from 'react';

const useCsv = (bookInfo) => {
  const anchor = useRef(null);
  const fileInput = useRef(null);

  return {
    anchor,
    fileInput,
    convertToCsv: convertToCsv(bookInfo),
    downloadCsv: downloadCsv(anchor),
    importCsv,
  };
};

export default useCsv;

// CSVエクスポート処理
export const convertToCsv = (bookInfo) => () => {
  if (!bookInfo || bookInfo.length === 0) return '';
  const key = Object.keys(bookInfo[0]);
  const values = bookInfo.map((book) => Object.values(book));
  const array = [key].concat(values);
  return array.map((a) => a.join(',')).join('\n');
}

// CSVダウンロード処理
export const downloadCsv = (anchorRef) => (csv, filename) => {
  const link = anchorRef.current
  if (!link) return

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.click()
}

// CSVインポート処理
export const importCsv = (func) => (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target.result;
    // 簡易CSVパース（カンマ区切り・1行目ヘッダ想定）
    const lines = text.split('\n').filter(Boolean);
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i]; });
      return obj;
    });
    if (func) func(data);
  };
  reader.readAsText(file);
  // 選択状態をリセット（同じファイルを連続で選択できるように）
  e.target.value = '';
};

