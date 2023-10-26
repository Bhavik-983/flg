import * as React from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteModal({ isOpen, onClose }: ModalProps) {
  const renderForm = (
    <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#FF5630',
          color: '#FFFFFF',
          _hover: {
            backgroundColor: 'rgb(183, 29, 24) !important',
          },
        }}
      >
        Delete
      </Button>
      <Button
        sx={{
          border: '1px solid rgba(145, 158, 171, 0.32)',
        }}
        onClick={() => {
          onClose();
        }}
      >
        Cancel
      </Button>
    </Box>
  );
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete
        </Typography>
        <Typography id="modal-modal-description" fontSize={14} sx={{ mt: 2 }}>
          Are you sure want to delete?
        </Typography>
        {renderForm}
      </Box>
    </Modal>
  );
}
