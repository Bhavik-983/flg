import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/language'));
const PageThree = lazy(() => import('src/pages/dashboard/member'));
const PageFour = lazy(() => import('src/pages/dashboard/setting'));
const KeyPage = lazy(() => import('src/pages/dashboard/key'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      // { element: <IndexPage />, index: true },
      { path: 'languages', element: <IndexPage /> },
      { path: 'member', element: <PageThree /> },
      { path: 'setting', element: <PageFour /> },
      { path: 'key', element: <KeyPage /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];
