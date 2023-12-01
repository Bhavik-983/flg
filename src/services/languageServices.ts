/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import client from '../lib/client';
import { ADD_LANGUAGE, GET_LANGUAGE, UPDATE_LANGUAGE } from '../utils/url';

export interface AddLanguageTypes {
  name: string;
  code: string;
}

const languageService = {
  addLanguage: async (AddLanguageData: AddLanguageTypes, projectId: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(
      `${ADD_LANGUAGE}/${projectId}`,
      AddLanguageData
    );
    return response.data;
  },
  getLanguages: async (project_id: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(`${GET_LANGUAGE}/${project_id}`);
    return response.data;
  },
  editLanguage: async (
    EditLanguageData: AddLanguageTypes,
    projectid: string,
    languageid: string
  ): Promise<any> => {
    const response: AxiosResponse<any> = await client.put(
      `${UPDATE_LANGUAGE}/${languageid}/${projectid}`,
      EditLanguageData
    );
    return response.data;
  },
};

export default languageService;
