import { KeyType, selectKeys } from 'src/store/slices/keySlice';
import { useAppSelector } from 'src/store/hooks';

import useProjectHook from './use-project-hook';

const useKeyHook = () => {
  const { currentProject } = useProjectHook();
  const allKeys: KeyType[] = useAppSelector(selectKeys);

  const projectKeys = allKeys.filter((key) => key.projectID === currentProject.projectID);

  return { projectKeys };
};

export default useKeyHook;
