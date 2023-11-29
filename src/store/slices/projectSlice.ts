/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

export interface ProjectType {
  _id: string;
  name: string;
}

interface Projects {
  allProject: ProjectType[];
  currentProject: ProjectType;
}

// Define the initial state using that type
const initialState: Projects = {
  allProject: [],
  currentProject: {
    _id: '',
    name: '',
  },
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetState: () => initialState,
    addProject: (state, action) => {
      state.allProject.push(action.payload);
    },
    setProject: (state, action) => {
      state.allProject = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
});

export const { setProject, resetState, addProject, setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.allProject;
export const currentProjects = (state: RootState) => state.projects.currentProject;
