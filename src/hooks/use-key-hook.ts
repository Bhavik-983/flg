/* eslint-disable consistent-return */
import { useState } from 'react';

import keyService from 'src/services/keyServices';

const useKeyHook = () => {
  const [allKeys, setAllKeys] = useState<any>([]);

  const handleAddKey = async (key: any, projectId: string, pageId: string) => {
    try {
      const response = await keyService.addKey(key, projectId, pageId);
      handleGetKey(projectId, pageId);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetKey = async (projectId: string, pageId: string) => {
    try {
      const response = await keyService.getKey(projectId, pageId);

      setAllKeys(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { allKeys, handleAddKey, handleGetKey, setAllKeys };
};

export default useKeyHook;
