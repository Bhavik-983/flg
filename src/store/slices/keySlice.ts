/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { Page } from "./pageSlice";
import type { RootState } from "../index";

export interface keyLanguage {
    language: {
        id: string;
        projectId: string;
        code: string;
        name: string;
        nativeName: string;
    },
    value: string;
}

export interface KeyType {
    keyID: string;
    keyName: string;
    page: Page;
    projectID: string;
    details: string;
    languages: keyLanguage[]
}

interface KeysTypes {
    allKeys: KeyType[]
}


// Define the initial state using that type 
const initialState: KeysTypes = {
    allKeys: [
        {
            keyID: "",
            keyName: "",
            page: {
                projectID: "",
                pageID: "",
                pageName: "",
            },
            projectID: "",
            details: "",
            languages: [
                {
                    language: {
                        id: "7477b141-6d80-4472-a3e2-b5e464e094af",
                        projectId: "34da3126-136f-3488-fsd6-e232a0c6123jf",
                        code: "hz",
                        name: "Herero",
                        nativeName: "Otjiherero"
                    },
                    value: "",
                }

            ]
        }
    ]
};

const keySlice = createSlice({
    name: "keys",
    initialState,
    reducers: {
        resetState: () => initialState,
        addKeys: (state, action) => {
            state.allKeys.push(action.payload);
        },
        addKeyLanguage: (state, action) => {
            // state.allKeys.forEach((data) => {

            // })
        }
    },

});

export const { resetState, addKeys, addKeyLanguage } = keySlice.actions;

export default keySlice.reducer;

export const selectLanguageData = (state: RootState) => state.keys.allKeys;
