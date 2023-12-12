/* eslint-disable consistent-return */
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { useAppDispatch } from 'src/store/hooks';
import { setUser } from 'src/store/slices/authSlice';
import authService, { RegisterTypes } from 'src/services/authServices';

const useRegisterHook = () => {
  const [fetching, setIsFetching] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const registerUser = async (Registerdata: RegisterTypes) => {
    setIsFetching(true);
    try {
      const response = await authService.userRegister(Registerdata);
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await authService.getUser();
      dispatch(setUser(response));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { registerUser, fetching, handleGetUser };
};

export default useRegisterHook;
