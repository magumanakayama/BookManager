import { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Search, BarChart, Add, ImportExport } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SubmitModal from './modal/SubmitModal';
import CsvModal from '../top/modal/CsvModal';
import useDialHook from '../hook/dialHook';
import { BASE_URL } from '../../constant';

const SpeedDialButtons = ({ bookStorage, setBookStorage, submitBook, triggerAlert }) => {
  const { dialOpen, setDialOpen, generateActions } = useDialHook();
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
      <SpeedDialLayout>
        <SpeedDial ariaLabel="SpeedDial" open={dialOpen} onClick={() => setDialOpen(!dialOpen)} icon={<SpeedDialIcon />}>
          {actions.map((action) => <SpeedDialAction key={action.name} icon={action.icon} onClick={action.onClick} />)}
        </SpeedDial>
      </SpeedDialLayout>
      {submitOpen && <SubmitModal setOpen={setSubmitOpen} submitBook={submitBook} triggerAlert={triggerAlert} />}
      {csvOpen && <CsvModal setOpen={setCsvOpen} bookInfo={bookStorage} setBookInfo={setBookStorage} />}
    </>
  );
};

const SpeedDialLayout = ({ children }) => {
  return (
    <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
      {children}
    </Box>
  );
}

export default SpeedDialButtons;