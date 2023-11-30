/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import { MemberProps } from 'src/store/slices/memberSlice';

import client from '../lib/client';
import { ADD_MEMBER, GET_MEMBER } from '../utils/url';

const memberService = {
  addMember: async (AddMemberData: MemberProps, projectId: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(
      `${ADD_MEMBER}/${projectId}`,
      AddMemberData
    );
    return response.data;
  },
  getMembers: async (projectId: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(`${GET_MEMBER}/${projectId}`);
    return response.data;
  },
};

export default memberService;
