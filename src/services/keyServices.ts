/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import { ADD_KEY } from 'src/utils/url';

import client from '../lib/client';

const pageService = {
  addKey: async (AddKeyData: any, projectId: string, pageId: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(
      `${ADD_KEY}/${projectId}/${pageId}`,
      AddKeyData
    );
    return response.data;
  },
};

export default pageService;
