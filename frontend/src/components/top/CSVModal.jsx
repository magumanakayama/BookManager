import { Box, Button, Modal } from '@mui/material';
import { useRef } from 'react';

const CSVModal = ({ open, setOpen, bookInfo }) => {
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
    link.setAttribute('href', url) // csvファイルの一時URLをセット
    link.setAttribute('download', filename) // ダウンロード用リンクであることを明記
    link.click()
  }


  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <Button variant="contained" color="primary" onClick={() => downloadCSV(convertToCSV(), 'books.csv')}>
          Export CSV
        </Button>
        <a ref={anchorRef} style={{ display: 'none' }}>download</a>
      </Box>
    </Modal>
  );
}

export default CSVModal;