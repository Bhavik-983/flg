import { useState } from 'react';

import { useAppSelector } from 'src/store/hooks';
import { KeyType, selectKeys } from 'src/store/slices/keySlice';

import useProjectHook from './use-project-hook';

const useKeyHook = () => {
  const { currentProject } = useProjectHook();
  const allKeys: KeyType[] = useAppSelector(selectKeys);
  const [data, setData] = useState<KeyType[]>(allKeys);
  const projectKeys = allKeys.filter((key) => key.projectID === currentProject._id);

  return { projectKeys, data, setData };
};

export default useKeyHook;
