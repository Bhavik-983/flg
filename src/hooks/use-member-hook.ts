/* eslint-disable consistent-return */
import { useSnackbar } from 'notistack';

import memberService from 'src/services/memberServices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  addMembers,
  setMembers,
  MemberProps,
  selectAllMembers,
} from 'src/store/slices/memberSlice';

import useProjectHook from './use-project-hook';

const useMemberHook = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { currentProject } = useProjectHook();

  const allMembers: MemberProps[] = useAppSelector(selectAllMembers);
  console.log(allMembers);
  const handleCreateMember = async (data: MemberProps, projectID: string, onClose: any) => {
    try {
      const response = await memberService.addMember(data, projectID);
      console.log(response);
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      const newMember = {
        email: response?.data?.email,
        role: response?.data?.value,
        projectID,
      };
      dispatch(addMembers(newMember));
      onClose()?.();
      handleGetMembers(currentProject?._id);
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
    }
  };

  const handleGetMembers = async (projectID: string) => {
    try {
      const response = await memberService.getMembers(projectID);
      console.log(response?.data[0]);
      const members = response?.data[0] || [];
      dispatch(setMembers(members));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleCreateMember,
    handleGetMembers,
    allMembers,
  };
};

export default useMemberHook;
