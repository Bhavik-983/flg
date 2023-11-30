import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Modal, Stack, Button, Typography } from '@mui/material';

import useProjectHook from 'src/hooks/use-project-hook';

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

  const { handleCreateProject } = useProjectHook();
  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = handleSubmit(async (data: any) => {
    if (data.name !== '') {
      handleCreateProject(data, handleClose);
    }
  });

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="name" label="Name" />
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
          onClick={handleClose}
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
