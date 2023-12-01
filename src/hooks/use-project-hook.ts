/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import { useSnackbar } from 'notistack';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import addProjectService, { AddProjectTypes } from 'src/services/projectServices';
import {
  setProject,
  ProjectType,
  selectProjects,
  currentProjects,
  setCurrentProject,
} from 'src/store/slices/projectSlice';

const useProjectHook = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const currentProject: ProjectType = useAppSelector(currentProjects);
  const allProjects: ProjectType[] = useAppSelector(selectProjects);
  const handleSetCurrentProject = (project: ProjectType) => {
    dispatch(setCurrentProject(project));
  };

  const handleCreateProject = async (AddProjectData: AddProjectTypes, handleClose: any) => {
    try {
      const response = await addProjectService.addProject(AddProjectData);
      handleClose()?.();
      const newProject = {
        _id: response?.data?._id,
        name: response?.data?.name,
      };

      handleSetCurrentProject(newProject);
      handleGetAllProjects();
      return newProject;
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      throw new Error(error);
    }
  };

  const handleGetAllProjects = async () => {
    try {
      const response = await addProjectService.getAllProject();
      const projects = response?.data?.rows || [];
      if (projects?.length === 0) {
        return {};
      }

      dispatch(setProject(projects));
      if (currentProject?._id === '') {
        const newCurrentProj = {
          _id: projects[projects.length - 1]?._id, // Set the current project to the last project
          name: projects[projects.length - 1]?.name,
        };
        handleSetCurrentProject(newCurrentProj);
        return newCurrentProj;
      }
      return currentProject;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (projectID: string) => {
    try {
      const response = await addProjectService.deleteProject(projectID);
      dispatch(setProject(response?.data?.rows));
      handleGetAllProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    currentProject,
    allProjects,
    handleSetCurrentProject,
    handleGetAllProjects,
    handleDeleteProject,
    handleCreateProject,
  };
};

export default useProjectHook;
