/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Page } from './pageSlice';
import type { RootState } from '../index';

export interface keyLanguage {
  language: {
    id: string;
    projectId: string;
    code: string;
    name: string;
    key: string;
  };
  value: string;
}

export interface KeyType {
  keyID: string;
  keyName: string;
  page: Page;
  projectID: string;
  details: string;
  languages: keyLanguage[];
}

interface KeysTypes {
  allKeys: KeyType[];
}

// Define the initial state using that type
const initialState: KeysTypes = {
  allKeys: [],
};

const keySlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    resetState: () => initialState,
    addKeyLanguage: (state, action) => {
      state.allKeys.forEach((data) => {
        if (data.keyID === action.payload.keyID) {
          data.languages.push(action.payload);
        }
      });
    },
    addKeys: (state, action) => {
      state.allKeys.push(action.payload);
    },
    setKeys: (state, action) => {
      state.allKeys = action.payload;
    },
  },
});

export const { resetState, addKeys, addKeyLanguage, setKeys } = keySlice.actions;

export default keySlice.reducer;

export const selectKeys = (state: RootState) => state.keys.allKeys;
