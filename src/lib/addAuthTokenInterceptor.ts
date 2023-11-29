/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-assign */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */

import client from './client';

export default function addAuthTokenInterceptor(store: any) {
  client.interceptors.request.use((req: any) => {
    const { token } = store.getState().auth;

    if (!token) return req;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
}
