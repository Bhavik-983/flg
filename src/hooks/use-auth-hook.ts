/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { resetState, setCredentials } from 'src/store/slices/authSlice';

import { RootState } from '../store';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const setCredentialsAction = (params: any) => {
    dispatch(setCredentials(params));
  };

  const logoutAction = () => {
    dispatch(resetState());
    navigate('/login');
  };

  return {
    token,
    setCredentialsAction,
    logoutAction,
  };
};

export default useAuth;
