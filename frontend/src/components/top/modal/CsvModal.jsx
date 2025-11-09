import { Box, Button, Stack } from '@mui/material';
import { FileDownload, FileUpload } from '@mui/icons-material';
import CustomAlert from '../CustomAlert';
import useCsv from '../../hook/csvHook';
import useAlertHook from '../../hook/alertHook';
import ModalLayout from './ModalLayout';

const CsvModal = ({ setOpen, bookInfo, setBookInfo }) => {
  const { anchor, fileInput, convertToCsv, downloadCsv, importCsv } = useCsv(bookInfo);
  const { alert, triggerAlert } = useAlertHook();
  const handleImport = (importBook) => {
    setBookInfo(importBook);
    // ToDo： open=falseになるためアラートが出ないのを修正
    triggerAlert('submit');
    setOpen(false);
  }

  return (
    <>
      <ModalLayout setOpen={setOpen}>
        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CsvButton type="output" onClick={() => downloadCsv(convertToCsv(), 'books.csv')} />
          <CsvButton type="input" onClick={() => fileInput.current && fileInput.current.click()} />
          <input ref={fileInput} type="file" accept=".csv" style={{ display: 'none' }} onChange={importCsv(handleImport)} />
          <a ref={anchor} style={{ display: 'none' }}>download</a>
        </Stack >
      </ModalLayout>
      <CustomAlert alert={alert} fireAlert={(alert) => triggerAlert(alert)} />
    </>
  );
}

const CsvButton = ({ type, onClick }) => {
  const typeObject = {
    input: {
      name: 'CSVを読み込ませる',
      icon: <FileUpload fontSize='large' />,
      variant: 'outlined'
    },
    output: {
      name: 'CSVをダウンロード',
      icon: <FileDownload fontSize='large' />,
      variant: 'contained'
    },
  };

  return (
    <Button variant={typeObject[type].variant} onClick={onClick} sx={{ width: '75%' }}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Box sx={{ flexGrow: 1 }} />
        {typeObject[type].icon}
        <div>{typeObject[type].name}</div>
      </Stack>
    </Button>
  );
};

export default CsvModal;