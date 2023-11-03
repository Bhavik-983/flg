import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fade, Backdrop, TextField } from '@mui/material';

import { useAppDispatch } from 'src/store/hooks';
import { addPages } from 'src/store/slices/pageSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
};

interface ProjectModalType {
  open: boolean;
  closeModal: () => void;
  currentProjId: string;
}

export default function AddPageModal({ open, closeModal, currentProjId }: ProjectModalType) {
  const [pageName, setPageName] = React.useState<string>('');
  const dispatch = useAppDispatch();

  const handleAddProject = () => {
    if (pageName !== '') {
      const newProject = {
        projectId: currentProjId,
        pageID: uuidv4(),
        pageName,
      };
      console.log(newProject);
      setPageName('');
      closeModal();
      dispatch(addPages(newProject));
    }
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center' }}
          >
            Add New Page
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ mb: 1, ml: '2px' }}>Page Name :</Typography>
            <TextField
              id="outlined-basic"
              autoComplete="off"
              fullWidth
              variant="outlined"
              value={pageName}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPageName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', pt: 3, gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ width: '100px' }}
              onClick={() => handleAddProject()}
            >
              Save
            </Button>
            <Button variant="outlined" size="large" sx={{ width: '100px' }} onClick={closeModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
