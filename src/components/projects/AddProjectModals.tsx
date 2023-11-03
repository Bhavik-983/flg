import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addProject, selectProjects, setCurrentProject } from 'src/store/slices/projectSlice';

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
}

const AddProjectModals = ({ open, closeModal }: ProjectModalType) => {
  const allProjects = useAppSelector(selectProjects);
  console.log(allProjects.length);
  const [projectName, setProjectName] = React.useState<string>('');
  const dispatch = useAppDispatch();

  const handleAddProject = () => {
    if (projectName !== '') {
      const newProject = {
        projectID: uuidv4(),
        projectName,
      };
      const defaultProject = {
        projectName: newProject.projectName,
        projectID: newProject.projectID,
      };
      dispatch(setCurrentProject(defaultProject));
      dispatch(addProject(newProject));
      setProjectName('');
      closeModal();
    }
  };

  return (
    <div>
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
              Add New Project
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ mb: 1, ml: '2px' }}>Title :</Typography>
              <TextField
                id="outlined-basic"
                autoComplete="off"
                fullWidth
                variant="outlined"
                value={projectName}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setProjectName(e.target.value)
                }
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
              <Button
                variant="outlined"
                size="large"
                sx={{ width: '100px' }}
                disabled={allProjects.length === 0}
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddProjectModals;
