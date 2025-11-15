import { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Search, BarChart, Add, ImportExport } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SubmitModal from './modal/SubmitModal';
import CsvModal from '../top/modal/CsvModal';
import useDialHook from '../hook/dialHook';
import useAlertHook from '../hook/alertHook';
import CustomAlert from './CustomAlert';
import { BASE_URL } from '../../constant';

const SpeedDialButtons = ({ bookStorage, setBookStorage }) => {
  const { dialOpen, setDialOpen, generateActions } = useDialHook();
  const { alert, triggerAlert } = useAlertHook();
  const [submitOpen, setSubmitOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const navigate = useNavigate();

  const actions = generateActions([
    [<Search />, 'Search', () => navigate(`${BASE_URL}/BookSearch`)],
    [<BarChart />, 'Graph', () => navigate(`${BASE_URL}/BookGraph`)],
    [<Add />, 'Add', () => setSubmitOpen(true)],
    [<ImportExport />, 'Close', () => setCsvOpen(true)],
  ]);

  return (
    <>
      <SpeedDialLayout open={dialOpen} setOpen={setDialOpen}>
        {actions.map((action) => <SpeedDialAction key={action.name} icon={action.icon} onClick={action.onClick} />)}
      </SpeedDialLayout>
      {submitOpen && <SubmitModal bookStorage={bookStorage} setBookStorage={setBookStorage} setOpen={setSubmitOpen} triggerAlert={triggerAlert} />}
      {csvOpen && <CsvModal setOpen={setCsvOpen} bookInfo={bookStorage} setBookInfo={setBookStorage} triggerAlert={triggerAlert} />}
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