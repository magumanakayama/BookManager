import { useState } from 'react';
import useQuagga from './useQuagga';
import { Modal, Box, Typography, Button, Alert } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const SCANNER_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  width: 340,
  p: 3,
};

export const BarcodeScanner = ({ onDetected, onClose }) => {
  // Quagga専用カスタムフック
  const { setViewport, error } = useQuagga(onDetected);

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={SCANNER_STYLE}>
        <Typography mb={2}>バーコードをカメラに向けてください</Typography>
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : (
          /* Quagga が video+canvas を注入するコンテナ */
          <Box
            ref={setViewport}
            sx={{ width: '100%', position: 'relative', '& video': { width: '100%' }, '& canvas': { display: 'none' } }}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>閉じる</Button>
        </Box>
      </Box>
    </Modal>
  );
};

const ScanButton = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const handleScanned = (isbn) => {
    // setBook({ ...NEW_BOOK_TEMPLATE, isbn });
    alert(`ISBNコードがスキャンされました: ${isbn}`);
    setScannerOpen(false);
  };

  return (
    <>
      <Button variant="outlined" startIcon={<QrCodeScannerIcon />} onClick={() => setScannerOpen(true)}>
        バーコードスキャン(まだ使えないよ)</Button>
      {scannerOpen && <BarcodeScanner onDetected={handleScanned} onClose={() => setScannerOpen(false)} />}
    </>
  );
};

export default ScanButton;
