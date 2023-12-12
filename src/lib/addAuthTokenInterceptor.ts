import axios from 'axios';

import { BASE_URL } from 'src/utils/environments';

import { setRefreshToken } from 'src/store/slices/authSlice';

import client from './client';
import { handleLogOut } from 'src/utils/config';
import { PATH_AFTER_REGISTER } from 'src/config-global';

let isRefreshTokenUpdating = false;

export default function addAuthTokenInterceptor(store: any) {
  client.interceptors.request.use((req: any) => {
    const { token } = store.getState().auth;

    if (!token) return req;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error?.config;
      const { refreshToken, token } = store.getState().auth;

      // originalConfig._retry = true;

      if (error.response) {
        if (
          !isRefreshTokenUpdating &&
          refreshToken &&
          error?.response?.status === 406 &&
          !originalConfig._retry
        ) {
          // If user login and have refresh token

          isRefreshTokenUpdating = true;
          originalConfig._retry = true;

          try {
            const data = JSON.stringify({
              refresh_token: refreshToken,
            });

            const config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: `${BASE_URL}/auth/generate-token`,
              headers: {
                'Content-Type': 'application/json',
              },
              data,
            };

            const result = await axios.request(config);
            isRefreshTokenUpdating = false;
            store.dispatch(setRefreshToken(result?.data?.data));
            return client(originalConfig);
          } catch (error) {
            console.log({ error });
            isRefreshTokenUpdating = false;
            window.location.reload();
            return handleLogOut();
          }
        } else if (isRefreshTokenUpdating) {
          // If refresh token is updating\
          await isRefreshTokenDone();
          return client(originalConfig);
        } else if (!token) {
          handleLogOut();
          window.location.assign(PATH_AFTER_REGISTER);
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Stop Function excution still refresh token did't update
 */
const isRefreshTokenDone = async (): Promise<boolean> => {
  if (isRefreshTokenUpdating) {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for one second
    return await isRefreshTokenDone();
  }
  return true;
};
