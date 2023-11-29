import { lazy } from 'react';

import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        ),
      },
      {
        path: 'register',
        element: (
          <AuthClassicLayout title="Manage the job more effectively with Minimal">
            <JwtRegisterPage />
          </AuthClassicLayout>
        ),
      },
    ],
  },
];
