import { Box, Button, Modal } from '@mui/material';
import { useRef } from 'react';

const CSVModal = ({ open, setOpen, bookInfo, setBookInfo, setAlert }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    width: 280,
    p: 4,
  }
  const anchorRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImport = (importBook) => {
    localStorage.removeItem("books");
    localStorage.setItem("books", JSON.stringify(importBook));
    setBookInfo(JSON.parse(localStorage.getItem('books')));
    setAlert({ open: true, message: '書籍情報を登録しました', severity: 'success' });
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
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => downloadCSV(convertToCSV(), 'books.csv')}
          sx={{ mb: 2 }}
        >
          Export CSV
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          sx={{ mb: 2, ml: 2 }}
        >
          Import CSV
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleImportCSV}
        />
        <a ref={anchorRef} style={{ display: 'none' }}>download</a>
      </Box>
    </Modal>
  );
}

export default CSVModal;