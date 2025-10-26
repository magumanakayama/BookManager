import { Box, Button } from '@mui/material';

const ModalButtons = ({ setOpen, require = true, handlePositive, handleDelete = () => { } }) => {
  return (
    <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
      {handleDelete && <Button variant="contained" color="error" onClick={handleDelete}>削除</Button>}
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="outlined" onClick={() => setOpen(false)}>閉じる</Button>
      <Button variant="contained" disabled={!require} onClick={handlePositive}>完了</Button>
    </Box>
  );
};

export default ModalButtons;