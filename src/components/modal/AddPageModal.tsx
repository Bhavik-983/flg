import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Modal, Stack, Button, Typography } from '@mui/material';

import useProjectHook from 'src/hooks/use-project-hook';

import { useAppDispatch } from 'src/store/hooks';
import { Page, addPages } from 'src/store/slices/pageSlice';

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

export default function AddPageModal({ isOpen, onClose }: ModalProps) {
  const dispatch = useAppDispatch();
  const { currentProject } = useProjectHook();

  const LanguageSchema = Yup.object().shape({
    pageName: Yup.string().min(2).required('Page Name is required'),
  });

  const defaultValues = {
    pageName: '',
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

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async (data: any) => {
    if (data.pageName !== '') {
      const newProject: Page = {
        projectID: currentProject.projectID,
        pageID: uuidv4(),
        pageName: data.pageName,
      };
      dispatch(addPages(newProject));
      handleClose();
    }
  });

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="pageName" label="Page Name" />
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
      <Typography variant="h4">Add Page</Typography>
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
