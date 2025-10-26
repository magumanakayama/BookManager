import { Modal, Box } from '@mui/material';
import { MODAL_STYLE } from '../../../constant';

const ModalLayout = ({ setOpen, children }) => {
  return (
    <Modal open={true} onClose={() => setOpen(false)}>
      <Box sx={MODAL_STYLE}>
        {children}
      </Box>
    </Modal>
  );
}

export default ModalLayout;