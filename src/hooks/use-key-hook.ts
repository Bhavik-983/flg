/* eslint-disable consistent-return */
import { useState } from 'react';

import keyService from 'src/services/keyServices';
import { addKeys, selectKeys } from 'src/store/slices/keySlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import useProjectHook from './use-project-hook';

const useKeyHook = () => {
  const { currentProject } = useProjectHook();
  const dispatch = useAppDispatch();
  const allKeys: any = useAppSelector(selectKeys);
  const [data, setData] = useState<any>(allKeys);
  const projectKeys = allKeys.filter((key: any) => key.projectID === currentProject._id);

  const handleAddKey = async (key: any, pageId: string, projectId: string) => {
    try {
      const response = await keyService.addKey(key, pageId, projectId);
      setData([...data, response?.data]);
      const newKey = {
        key: response?.data?.key,
        pageID: response?.data?.pageID,
        projectID: response?.data?.projectID,
      };
      dispatch(addKeys(newKey));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetKey = async (projectId: string, pageId: string) => {
    try {
      const response = await keyService.getKey(projectId, pageId);
      // setData(response?.data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { projectKeys, data, setData, handleAddKey, handleGetKey };
};

export default useKeyHook;
