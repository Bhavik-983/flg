/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';

import { ADD_LANGUAGE, DELETE_LANGUAGE, UPDATE_LANGUAGE } from 'src/utils/url';

import client from 'src/lib/client';

export interface TranslateLanguae {
  q: string;
  target: string;
  api_key: string;
}

export interface Language {
  createdAt: string;
  key: string;
  name: string;
  status: boolean;
  updatedAt: string;

  _id: any;
}

const languageService = {
  getAllLanguage: async (): Promise<Language[]> => {
    const response: AxiosResponse<any> = await axios.get('/api/language');
    return response?.data?.rows;
  },

  UpdateLanguageTranslate: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await axios.post('https://libretranslate.com/translate', {
      q: data?.q,
      source: 'auto',
      target: data?.target,
      format: 'text',
      api_key: '',
    });
    return response?.data;
  },
  addLanguage: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(`${ADD_LANGUAGE}`, data);
    return response.data;
  },
  updatedLanguage: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.put(
      `${UPDATE_LANGUAGE}${data.languageId}`,
      data.data
    );
    return response.data;
  },
  deleteLanguage: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.delete(
      `${DELETE_LANGUAGE}${data.languageId}`
    );
    return response.data;
  },
};

export default languageService;
