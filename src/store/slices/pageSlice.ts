/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../index";

export interface Page {
    projectID: string;
    pageID: string;
    pageName: string;
}

interface Pages {
    allPages: Page[];
}

// Define the initial state using that type 
const initialState: Pages = {
    allPages: [
        {
            projectID: "34da3126-136f-3488-fsd6-e232a0c6123jf",
            pageID: "3384bd3d-e1fc-49d1-8aab-c93c10ca33bb",
            pageName: "Home Page",
        }
    ]
};

const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        resetState: () => initialState,
        addPages: (state, action) => {
            state.allPages.push(action.payload);
        },
    },

});

export const { resetState, addPages } = pageSlice.actions;

export default pageSlice.reducer;

export const selectAllPages = (state: RootState) => state.pages.allPages;
