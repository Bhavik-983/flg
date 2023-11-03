/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

export interface MemberProps {
  name: string;
  email: string;
  role: {
    label: string;
    value: string;
  };
}

interface Members {
  allMembers: MemberProps[];
}

// Define the initial state using that type
const initialState: Members = {
  allMembers: [
    {
      name: '',
      email: '',
      role: {
        label: '',
        value: '',
      },
    },
  ],
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    resetState: () => initialState,
    addMembers: (state, action) => {
      state.allMembers.push(action.payload);
    },
  },
});

export const { resetState, addMembers } = memberSlice.actions;

export default memberSlice.reducer;

export const selectAllMembers = (state: RootState) => state.member.allMembers;
