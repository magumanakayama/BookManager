import { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Search, BarChart, Add, ImportExport, DeveloperMode } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SubmitModal from './modal/SubmitModal';
import CsvModal from '../top/modal/CsvModal';
import useDialHook from '../hook/dialHook';
import useAlertHook from '../hook/alertHook';
import CustomAlert from './CustomAlert';

const SpeedDialButtons = ({ bookStorageInstance }) => {
  const { bookStorage, setBookStorage, submitBook } = bookStorageInstance;
  const { dialOpen, setDialOpen, generateActions } = useDialHook();
  const { alert, triggerAlert } = useAlertHook();

  const [modalComponent, setModalComponent] = useState(undefined);
  const navigate = useNavigate();

  // アクションボタン共通ハンドラー
  const submitHandler = (callback) => (book) => {
    callback(book);
    triggerAlert('submit');
    setModalComponent(undefined);
  }

  // モーダルコンポーネントリスト
  const modalList = {
    submit: <SubmitModal onClose={() => setModalComponent(undefined)} handleSubmit={submitHandler(submitBook)} />,
    csv: <CsvModal onClose={() => setModalComponent(undefined)} bookInfo={bookStorage} handleImport={submitHandler(setBookStorage)} />
  };

  // スピードダイアル用アクションボタン群生成
  const actions = generateActions([
    [<Search />, 'Search', () => navigate('/BookSearch')],
    [<BarChart />, 'Graph', () => navigate('/BookGraph')],
    [<Add />, 'Submit', () => setModalComponent(modalList['submit'])],
    [<ImportExport />, 'CSV', () => setModalComponent(modalList['csv'])],
    [<DeveloperMode />, 'Developer Mode', () => navigate('/build-info.json')]
  ]);

  return (
    <>
      <SpeedDialLayout open={dialOpen} setOpen={setDialOpen}>
        {actions.map(({ icon, name, onClick }) => <SpeedDialAction key={name} icon={icon} onClick={onClick} />)}
      </SpeedDialLayout>
      {modalComponent}
      <CustomAlert alert={alert} close={close} />
    </>
  );
};

const SpeedDialLayout = ({ children, open, setOpen }) => {
  return (
    <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
      <SpeedDial ariaLabel="SpeedDial" open={open} onClick={() => setOpen(!open)} icon={<SpeedDialIcon />}>
        {children}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialButtons;