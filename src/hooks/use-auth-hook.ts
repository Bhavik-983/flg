/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { handleLogOut } from 'src/utils/config';

import { useAppSelector } from 'src/store/hooks';
import { PATH_AFTER_REGISTER } from 'src/config-global';
import { resetState as resetProjectState } from 'src/store/slices/projectSlice';
import { resetState as resetLanguageState } from 'src/store/slices/LanguageSlice';
import { resetState, setCredentials, selectCurrentUser } from 'src/store/slices/authSlice';

import { RootState } from '../store';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const userDetails = useAppSelector(selectCurrentUser);

  const setCredentialsAction = (params: any) => {
    dispatch(setCredentials(params));
  };

  const logoutAction = () => {
    dispatch(resetState());
    dispatch(resetProjectState());
    dispatch(resetLanguageState());
    navigate(PATH_AFTER_REGISTER);
    handleLogOut();
  };

  return {
    token,
    setCredentialsAction,
    logoutAction,
    userDetails,
  };
};

export default useAuth;
