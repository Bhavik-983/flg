import * as Yup from 'yup';
import { BsSend } from 'react-icons/Bs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Modal, Stack } from '@mui/material';

import useMemberHook from 'src/hooks/use-member-hook';
import useProjectHook from 'src/hooks/use-project-hook';

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
  memberId: string;
}

export default function EditMemberModal({ isOpen, onClose, memberId }: ModalProps) {
  console.log({ memberId });
  const { handleUpdateMember } = useMemberHook();
  const { currentProject } = useProjectHook();

  const LanguageSchema = Yup.object().shape({
    role: Yup.object().shape({
      label: Yup.string().required('Role is required'),
      value: Yup.string().required('Role is required'),
    }),
  });

  const defaultValues = {
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

  const handleUpdate = (res: any) => {
    handleUpdateMember(currentProject?._id, memberId, res, onClose);
  };

  const onSubmit = handleSubmit(async (data: any) => {
    console.log({ data });
    const member = {
      role: data?.role?.value,
    };
    handleUpdate(member);
  });

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFSelectField options={defaultLanguages} handleChange={setValue} name="role" label="Role" />
      <ModalButton
        handleClick={handleClick}
        isSubmitting={isSubmitting}
        loadingText="Update"
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
          <ModalTitle title="Edit Member" />
          {renderForm}
        </FormProvider>
      </Box>
    </Modal>
  );
}
