/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import client from '../lib/client';
import { ADD_PAGE, GET_PAGE, GET_ALL_PAGE, GET_PAGE_NAME } from '../utils/url';

export interface AddPageTypes {
  name: string;
}

const pageService = {
  addPage: async (AddPageData: AddPageTypes, projectId: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(`${ADD_PAGE}/${projectId}`, AddPageData);
    return response.data;
  },
  getPageName: async (projectId: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(`${GET_PAGE_NAME}/${projectId}`);
    return response.data;
  },
  getAllPage: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(GET_ALL_PAGE);
    return response.data;
  },
  getPage: async (pageid: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(`${GET_PAGE}/${pageid}`);
    return response.data;
  },
};

export default pageService;
