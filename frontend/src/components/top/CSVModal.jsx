import { Box, Button, Stack, Modal } from '@mui/material';
import { FileDownload, FileUpload } from '@mui/icons-material';
import { useRef } from 'react';
import { MODAL_STYLE } from '../../constant';

const CSVModal = ({ CSVopen, setCSVOpen, bookInfo, setBookInfo, setAlert }) => {
  const anchorRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImport = (importBook) => {
    setBookInfo(importBook);
    setAlert({ open: true, message: '書籍情報を登録しました', severity: 'success' });
    setCSVOpen(false);
  }

  const convertToCSV = () => {
    if (!bookInfo || bookInfo.length === 0) return '';
    const key = Object.keys(bookInfo[0]);
    const values = bookInfo.map((book) => Object.values(book));
    const array = [key].concat(values);
    return array.map((a) => a.join(',')).join('\n');
  }

  const downloadCSV = (csv, filename) => {
    const link = anchorRef.current
    if (!link) return

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.click()
  }

  // CSVインポート処理
  const handleImportCSV = (e) => {
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
      if (handleImport) handleImport(data);
    };
    reader.readAsText(file);
    // 選択状態をリセット（同じファイルを連続で選択できるように）
    e.target.value = '';
  };


  return (
    <Modal open={CSVopen} onClose={() => setCSVOpen(false)}>
      <Stack spacing={2} sx={{ ...MODAL_STYLE, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button variant="contained" onClick={() => downloadCSV(convertToCSV(), 'books.csv')} sx={{ width: '75%' }}>
          <Stack direction="column" spacing={2} alignItems="center">
            <Box sx={{ flexGrow: 1 }} />
            <FileDownload fontSize='large' />
            <div>CSVをダウンロード</div>
          </Stack>
        </Button>
        <Button variant="outlined" onClick={() => fileInputRef.current && fileInputRef.current.click()} sx={{ width: '75%' }}>
          <Stack direction="column" spacing={2} alignItems="center">
            <Box sx={{ flexGrow: 1 }} />
            <FileUpload fontSize='large' />
            <div>CSVを読み込ませる</div>
          </Stack>
        </Button>
        <input ref={fileInputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleImportCSV} />
        <a ref={anchorRef} style={{ display: 'none' }}>download</a>
      </Stack >
    </Modal >
  );
}

export default CSVModal;