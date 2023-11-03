/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

export interface ProjectType {
<<<<<<< HEAD
    projectID: string;
    projectName: string;
=======
  projectId: string;
  projectName: string;
>>>>>>> 7ad6a00c8c0f36b387108aa51c4f5edb7bc55b33
}

interface Projects {
  allProject: ProjectType[];
  currentProject: ProjectType;
}

// Define the initial state using that type
const initialState: Projects = {
  allProject: [
    {
<<<<<<< HEAD
        projectID: "",
        projectName: ''
    }
=======
      projectId: '34da3126-136f-3488-fsd6-e232a0c6123jf',
      projectName: 'Servery management',
    },
  ],
  currentProject: {
    projectId: 'ea0a3126-136f-4017-af14-e232a0c6baa3',
    projectName: 'Servery management',
  },
>>>>>>> 7ad6a00c8c0f36b387108aa51c4f5edb7bc55b33
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetState: () => initialState,
    addProject: (state, action) => {
      state.allProject.push(action.payload);
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
});

export const { resetState, addProject, setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.allProject;
export const currentProjects = (state: RootState) => state.projects.currentProject;
