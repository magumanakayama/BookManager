import { Modal, Box } from '@mui/material';
import { MODAL_STYLE } from '../../../constant';

const ModalLayout = ({ onClose, children }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={MODAL_STYLE}>
        {children}
      </Box>
    </Modal>
  );
}

export default ModalLayout;