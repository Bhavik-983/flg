/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import client from '../lib/client';
import { ADD_MEMBER, GET_MEMBER, UPDATE_MEMBER } from '../utils/url';

interface MemberProps {
  email: string;
  role: {
    value: string;
    label: string;
  };
}

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
  updateMember: async (projectID: string, userId: string, memberData: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.put(
      `${UPDATE_MEMBER}/${projectID}/${userId}`,
      memberData
    );
    return response.data;
  },
};

export default memberService;
