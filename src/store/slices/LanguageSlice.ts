/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { languageData } from 'src/utils/LanguageData';

import type { RootState } from '../index';

export interface Language {
  id: string;
  projectID: string;
  name: string;
  code: string;
  // key: string;
}

export interface NewLanguage {
  name: string;
  code: string;
  _id: string;
  // key: string;
}
export interface ProjectLanguage {
  id: string;
  projectID: string;
  name: string;
  code: string;
  // key: string;
  pageID: string;
}

export interface DefaultLanguage {
  code: string;
  name: string;
  // key: string;
}

interface Projects {
  defaultLanguages: DefaultLanguage[];
  allLanguages: Language[];
  languages: NewLanguage[];
}

// Define the initial state using that type
const initialState: Projects = {
  defaultLanguages: languageData,
  allLanguages: [],
  languages: [],
};

const LanguageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    resetState: () => initialState,
    addProjectLanguage: (state, action) => {
      state.allLanguages.push(action.payload);
    },
    projectLanguages: (state, action) => {
      state.languages = action.payload;
    },
    editProjectLanguage: (
      state,
      action: {
        payload: {
          id: string;
          name: string;
          code: string;
          // key: string
        };
      }
    ) => {
      state.allLanguages = state.allLanguages.map((language: Language) => {
        if (action.payload.id === language.id) {
          return {
            ...language,
            name: action.payload.name,
            code: action.payload.code,
            // key: action.payload.key,
          };
        }
        return language;
      });
    },
  },
});

export const { resetState, projectLanguages, addProjectLanguage, editProjectLanguage } =
  LanguageSlice.actions;

export default LanguageSlice.reducer;

export const selectDefaultLanguagesData = (state: RootState) => state.languages.defaultLanguages;
export const selectAllLanguagesData = (state: RootState) => state.languages.allLanguages;
export const selectProjectLanguage = (state: RootState) => state.languages.languages;
