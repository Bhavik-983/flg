import * as Yup from 'yup';
import { BsSend } from 'react-icons/Bs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Modal, Stack } from '@mui/material';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import ModalTitle from '../title/ModalTitle';
import ModalButton from '../button/ModalButton';
import RHFSelectField from '../hook-form/rhf-select-field';

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
  const LanguageSchema = Yup.object().shape({
    name: Yup.string().min(2).required('Name is required'),
    email: Yup.string().min(2).email('Please enter a valid email!').required('Email is required'),
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

  const handleClick = () => {
    reset();
    onClose();
  };

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="name" label="Name" />
      <RHFTextField name="email" label="Email" />
      <RHFSelectField options={defaultLanguages} handleChange={setValue} name="role" label="Role" />
      <ModalButton
        handleClick={handleClick}
        isSubmitting={isSubmitting}
        loadingText="Invite"
        title="Cancel"
        icon={
          <BsSend
            style={{
              height: 15,
              width: 15,
              paddingRight: 2,
              marginRight: 5,
            }}
          />
        }
      />
    </Stack>
  );

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <ModalTitle title="Add Member" />
          {renderForm}
        </FormProvider>
      </Box>
    </Modal>
  );
}
