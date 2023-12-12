/* eslint-disable consistent-return */
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import keyService from 'src/services/keyServices';

const useKeyHook = () => {
  const [allKeys, setAllKeys] = useState<any>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddKey = async (key: any, projectId: string, pageId: string) => {
    try {
      const response = await keyService.addKey(key, projectId, pageId);
      handleGetKey(projectId, pageId);
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
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    }
  };

  const handleGetKey = async (projectId: string, pageId: string) => {
    try {
      const response = await keyService.getKey(projectId, pageId);
      setAllKeys(response);
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
      console.log(error);
    }
  };

  const handleUpdateKey = async (
    projectId: string,
    pageId: string,
    keyId: string,
    keyData: any
  ) => {
    try {
      const response = await keyService.updateKey(projectId, pageId, keyId, keyData);
      return response;
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    }
  };

  return { allKeys, handleAddKey, handleGetKey, setAllKeys, handleUpdateKey };
};

export default useKeyHook;
