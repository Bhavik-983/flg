import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  addProject,
  ProjectType,
  selectProjects,
  currentProjects,
  setCurrentProject,
} from 'src/store/slices/projectSlice';

const useProjectHook = () => {
  const dispatch = useAppDispatch();

  const currentProject: ProjectType = useAppSelector(currentProjects);
  const allProjects: ProjectType[] = useAppSelector(selectProjects);

  const handleSetCurrentProject = (project: ProjectType) => {
    dispatch(setCurrentProject(project));
  };

  const handleAddNewProject = (name: string, handleClose: any) => {
    const newProject: ProjectType = {
      projectID: uuidv4(),
      projectName: name,
    };

    dispatch(addProject(newProject));
    handleSetCurrentProject(newProject);

    handleClose()?.();
  };

  return {
    currentProject,
    allProjects,
    handleAddNewProject,
    handleSetCurrentProject,
  };
};

export default useProjectHook;
