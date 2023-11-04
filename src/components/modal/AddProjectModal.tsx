import * as Yup from 'yup';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Modal, Stack, Button, Typography } from '@mui/material';

import { useAppDispatch } from 'src/store/hooks';
import { addPages } from 'src/store/slices/pageSlice';
import { addProject, setCurrentProject } from 'src/store/slices/projectSlice';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProjectModal({ isOpen, onClose }: ModalProps) {
  const dispatch = useAppDispatch();

  const LanguageSchema = Yup.object().shape({
    name: Yup.string().min(2).required('Project Name is required'),
  });

  const defaultValues = {
    name: '',
  };

  const methods = useForm({
    resolver: yupResolver(LanguageSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    if (data.name !== '') {
      const newProject = {
        projectID: uuidv4(),
        projectName: data.name,
      };
      const defaultProject = {
        projectName: newProject.projectName,
        projectID: newProject.projectID,
      };
      const defaultPage = {
        projectID: newProject.projectID,
        pageID: uuidv4(),
        pageName: 'Default',
      };
      dispatch(addPages(defaultPage));
      dispatch(addProject(newProject));
      dispatch(setCurrentProject(defaultProject));
      onClose();
      reset();
    }
  });

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="name" label="name" />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <LoadingButton
          color="inherit"
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save
        </LoadingButton>
        <Button
          sx={{
            border: '1px solid rgba(145, 158, 171, 0.32)',
          }}
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>
      </Box>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Add Project</Typography>
    </Stack>
  );
  return (
    <Modal
      open={isOpen}
      //   onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderHead}
          {renderForm}
        </FormProvider>
      </Box>
    </Modal>
  );
}
