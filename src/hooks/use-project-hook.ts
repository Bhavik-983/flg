/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import { useSnackbar } from 'notistack';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import addProjectService, { AddProjectTypes } from 'src/services/projectServices';
import {
  setProject,
  addProject,
  ProjectType,
  selectProjects,
  currentProjects,
  setCurrentProject,
} from 'src/store/slices/projectSlice';

import useProjectModal from './use-projects-modal';

const useProjectHook = () => {
  const addProjectModal = useProjectModal();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const currentProject: ProjectType = useAppSelector(currentProjects);
  const allProjects: ProjectType[] = useAppSelector(selectProjects);
  const handleSetCurrentProject = (project: ProjectType) => {
    dispatch(setCurrentProject(project));
    // handleGetLanguages(currentProject._id);
  };

  const handleCreateProject = async (AddProjectData: AddProjectTypes, handleClose: any) => {
    try {
      const response = await addProjectService.addProject(AddProjectData);
      handleClose()?.();
      const newProject = {
        _id: response?.data?._id,
        name: response?.data?.name,
      };
      dispatch(addProject(newProject));
      handleGetAllProjects();
      return response;
    } catch (error) {
      // toast(error?.response?.data?.message);
      enqueueSnackbar(error?.response?.data?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      console.log(error);
    }
  };

  const handleGetAllProjects = async () => {
    try {
      const response = await addProjectService.getAllProject();
      const projects = response?.data?.rows || [];
      dispatch(setProject(projects));

      if (projects?.length === 0) {
        addProjectModal.openAddProjectModal();
        return;
      }

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
