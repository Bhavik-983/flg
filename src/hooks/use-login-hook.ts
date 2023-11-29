/* eslint-disable consistent-return */
import { useState } from 'react';

import authService, { LoginTypes } from 'src/services/authServices';

import useAuth from './use-auth-hook';

const useLoginHook = () => {
  const [fetching, setIsFetching] = useState<boolean>(false);
  const { setCredentialsAction } = useAuth();

  const loginUser = async (LoginData: LoginTypes) => {
    setIsFetching(true);
    try {
      const response = await authService.userlogin(LoginData);
      setCredentialsAction(response?.data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return { loginUser, fetching };
};

export default useLoginHook;
