/* eslint-disable consistent-return */
import { useState } from 'react';

import authService, { RegisterTypes } from 'src/services/authServices';

const useRegisterHook = () => {
  const [fetching, setIsFetching] = useState<boolean>(false);

  const registerUser = async (Registerdata: RegisterTypes) => {
    setIsFetching(true);
    try {
      const response = await authService.userRegister(Registerdata);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return { registerUser, fetching };
};

export default useRegisterHook;
