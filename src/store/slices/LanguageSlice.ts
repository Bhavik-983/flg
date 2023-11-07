/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { languageData } from 'src/utils/LanguageData';

import type { RootState } from '../index';

export interface Language {
  id: string;
  projectID: string;
  name: string;
  code: string;
  nativeName: string;
}

export interface DefaultLanguage {
  code: string;
  name: string;
  nativeName: string;
}

interface Projects {
  defaultLanguages: DefaultLanguage[];
  allLanguages: Language[];
}

// Define the initial state using that type
const initialState: Projects = {
  defaultLanguages: languageData,
  allLanguages: [],
};

const LanguageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    resetState: () => initialState,
    addProjectLanguage: (state, action) => {
      state.allLanguages.push(action.payload);
    },
    editProjectLanguage: (
      state,
      action: { payload: { id: string; name: string; code: string; nativeName: string } }
    ) => {
      state.allLanguages.map((language: Language) => {
        if (action.payload.id === language.id) {
          language.name = action.payload.name;
          language.code = action.payload.code;
          language.nativeName = action.payload.nativeName;
        }
      });
    },
  },
});

export const { resetState, addProjectLanguage, editProjectLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;

export const selectDefaultLanguagesData = (state: RootState) => state.languages.defaultLanguages;
export const selectAllLanguagesData = (state: RootState) => state.languages.allLanguages;
