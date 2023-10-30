import * as Yup from 'yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Alert, Modal, Stack, Button, Typography } from '@mui/material';

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

export default function WebsiteModal({ isOpen, onClose }: ModalProps) {
  const [errorMsg, setErrorMsg] = React.useState('');

  const LanguageSchema = Yup.object().shape({
    name: Yup.string().min(2).required('Name is required'),
    url: Yup.string()
      .required('URL is required')
      .matches(
        /^(https?:\/\/[^\s/$.?#].[^\s]*)\.com$/,
        'URL must start with http:// or https://, end with .com, and not end with /'
      ),
  });

  const defaultValues = {
    name: '',
    url: '',
  };

  const methods = useForm({
    resolver: yupResolver(LanguageSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data);
    // const modifiedValues = {
    //   ...values,
    //   key: values?.key?.toLowerCase(),
    // };
    // if (isEdit) {
    //   action({ data: modifiedValues, languageId: current?._id });
    // } else {
    //   action(modifiedValues);
    // }
  });

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="name" label="Name" />
      <RHFTextField name="url" label="URL" />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          sx={{
            border: '1px solid rgba(145, 158, 171, 0.32)',
          }}
          onClick={() => {
            onClose();
            reset();
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          color="inherit"
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save
        </LoadingButton>
      </Box>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Add Website</Typography>
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
