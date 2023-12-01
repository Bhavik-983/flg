/* eslint-disable consistent-return */
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import memberService from 'src/services/memberServices';

export interface MemberProps {
  email: string;
  role: {
    value: string;
    label: string;
  };
}

const useMemberHook = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleCreateMember = async (data: MemberProps, projectID: string, onClose: any) => {
    setFetching(true);
    try {
      const response = await memberService.addMember(data, projectID);
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      onClose()?.();
      handleGetMembers(projectID);
      return response;
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    } finally {
      setFetching(false);
    }
  };

  const handleGetMembers = async (projectID: string) => {
    setLoading(true);
    try {
      const response = await memberService.getMembers(projectID);
      const members = response?.data?.rows || [];
      setAllMembers(members);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreateMember,
    handleGetMembers,
    allMembers,
    loading,
    fetching,
  };
};

export default useMemberHook;
