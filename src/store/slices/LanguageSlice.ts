/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { languageData } from "src/utils/LanguageData";

import type { RootState } from "../index";

export interface ProjectLanguage {
    id: string;
    projectId: string;
    name: string;
    code: string;
}

export interface Language {
    code: string;
    name: string;
    nativeName: string;
}

interface Projects {
    allLanguage: Language[]
    projectLanguage: ProjectLanguage[]
}

// Define the initial state using that type 
const initialState: Projects = {
    allLanguage: languageData,
    projectLanguage: [
        {
            id: 'faskld',
            name: 'English',
            code: "en",
            projectId: 'faskdf;'
        }
    ]
};

const LanguageSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {
        resetState: () => initialState,
        addProjectLanguage: (state, action) => {
            state.projectLanguage.push(action.payload);
        }   
    },

});

export const { resetState, addProjectLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;

export const selectLanguageData = (state: RootState) => state.languages.allLanguage;
export const selectProjectLanguage = (state: RootState) => state.languages.projectLanguage;
