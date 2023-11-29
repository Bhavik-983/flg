/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import client from '../lib/client';
import { ADD_PROJECT, DELETE_PROJECT, GET_ALL_PROJECT } from '../utils/url';

export interface AddProjectTypes {
  name: string;
}

const addProjectService = {
  addProject: async (AddProjectData: AddProjectTypes): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(ADD_PROJECT, AddProjectData);
    return response.data;
  },
  getAllProject: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(GET_ALL_PROJECT);
    return response.data;
  },
  deleteProject: async (projectId: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.delete(`${DELETE_PROJECT}/${projectId}`);
    return response.data;
  },
};

export default addProjectService;
