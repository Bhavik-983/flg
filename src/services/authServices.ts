/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';

import client from '../lib/client';
import { GET_USER } from '../utils/url';

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
    const response: AxiosResponse<any> = await axios.post(
      'http://192.168.1.22:3000/auth/create-account',
      Registerdata
    );
    return response;
  },
  userlogin: async (LoginData: LoginTypes): Promise<any> => {
    const response: AxiosResponse<any> = await axios.post(
      'http://192.168.1.22:3000/auth/user-login',
      LoginData
    );
    return response.data;
  },
  getUser: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(GET_USER);
    return response.data?.data;
  },
};

export default authService;
