import * as Yup from 'yup';
import { BsSend } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Modal, Stack } from '@mui/material';

import useMemberHook from 'src/hooks/use-member-hook';
import useProjectHook from 'src/hooks/use-project-hook';

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
  getAll: () => void;
}

export default function AddMemberModal({ isOpen, onClose, getAll }: ModalProps) {
  const { handleCreateMember } = useMemberHook();
  const { currentProject } = useProjectHook();
  const LanguageSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email!').required('Email is required'),
    role: Yup.object().shape({
      label: Yup.string().required('Role is required'),
      value: Yup.string().required('Role is required'),
    }),
  });

  const defaultValues = {
    email: '',
    role: {
      label: '',
      value: '',
    },
  };

  const defaultLanguages = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'MEMBER', value: 'MEMBER' },
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

  const handleClick = () => {
    reset();
    onClose();
  };

  const handleAfterAddSuccess = () => {
    handleClick();
    getAll();
  };

  const onSubmit = handleSubmit(async (data: any) => {
    const member = {
      email: data?.email,
      role: data?.role?.value,
    };
    handleCreateMember(member, currentProject?._id, handleAfterAddSuccess);
  });

  const renderForm = (
    <Stack spacing={2.5}>
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
