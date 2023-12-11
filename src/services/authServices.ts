/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

import client from '../lib/client';
import { GET_USER, USER_LOGIN, USER_REGISTER } from '../utils/url';

export interface RegisterTypes {
  email: string;
  password: string;
  username: string;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface TokenTypes {
  token: string;
}

const authService = {
  userRegister: async (Registerdata: RegisterTypes): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(USER_REGISTER, Registerdata);
    return response.data;
  },
  userlogin: async (LoginData: LoginTypes): Promise<any> => {
    const response: AxiosResponse<any> = await client.post(USER_LOGIN, LoginData);
    return response.data;
  },
  getUser: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(GET_USER);
    return response.data?.data;
  },
};

export default authService;
