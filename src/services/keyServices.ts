/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import { ADD_KEY, GET_KEY } from 'src/utils/url';

import client from '../lib/client';

const keyService = {
  addKey: async (AddKeyData: any, projectId: string, pageId: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(
      `${ADD_KEY}/${projectId}/${pageId}`,
      AddKeyData
    );
    return response.data;
  },
  getKey: async (projectId: string, pageId: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(`${GET_KEY}/${projectId}/${pageId}`);
    return response.data;
  },
};

export default keyService;
