import * as Yup from 'yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Alert, Modal, Stack, Button, Typography } from '@mui/material';

// import { defaultLanguages } from 'src/utils/languageData';

import { BsSend } from 'react-icons/Bs';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import RHFSelectField from '../hook-form/rhf-select-field';
// import RHFSelectField from 'src/components/hook-form/rhf-select-field';

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

export default function AddMemberModal({ isOpen, onClose }: ModalProps) {
  const [errorMsg, setErrorMsg] = React.useState('');
  console.log(setErrorMsg);
  const LanguageSchema = Yup.object().shape({
    name: Yup.string().min(2).required('Name is required'),
    email: Yup.string().min(2).required('Email is required'),
    role: Yup.object().shape({
      label: Yup.string().required('Role is required'),
      value: Yup.string().required('Role is required'),
    }),
  });

  const defaultValues = {
    name: '',
    email: '',
    role: {
      label: '',
      value: '',
    },
  };

  const defaultLanguages = [
    { label: 'Project Manager', value: 'PM' },
    { label: 'Developer', value: 'DP' },
    { label: 'Translator', value: 'TS' },
  ];

  const methods = useForm({
    resolver: yupResolver(LanguageSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data);
  });

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <RHFTextField name="name" label="Name" />
      <RHFTextField name="email" label="Email" />
      <RHFSelectField options={defaultLanguages} handleChange={setValue} name="role" label="Role" />
      <Box display="flex" justifyContent="flex-end" gap={2}>
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
        <LoadingButton
          color="inherit"
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          <BsSend
            style={{
              height: 15,
              width: 15,
              paddingRight: 2,
              marginRight: 5,
            }}
          />
          Invite
        </LoadingButton>
      </Box>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Add Member</Typography>
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
