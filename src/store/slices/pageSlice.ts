/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

export interface Page {
  projectID: string;
  pageID: string;
  pageName: string;
}

interface Pages {
  allPages: Page[];
  currentPage: Page;
}

// Define the initial state using that type
const initialState: Pages = {
  allPages: [],
  currentPage: {
    projectID: '',
    pageID: '',
    pageName: '',
  },
};

const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    resetState: () => initialState,
    addCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addPages: (state, action) => {
      state.allPages.push(action.payload);
    },
    setPages: (state, action) => {
      state.allPages = action.payload;
    },
  },
});

export const { setPages, resetState, addPages, addCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;

export const selectAllPages = (state: RootState) => state.pages.allPages;
export const selectCurrentPage = (state: RootState) => state.pages.currentPage;
