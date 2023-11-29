/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import client from '../lib/client';
import { ADD_PAGE, GET_PAGE_NAME } from '../utils/url';

export interface AddPageTypes {
  name: string;
}

const pageService = {
  addPage: async (AddPageData: AddPageTypes, projectId: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(`${ADD_PAGE}/${projectId}`, AddPageData);
    return response.data;
  },
  getPageName: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(GET_PAGE_NAME);
    return response.data;
  },
};

export default pageService;
