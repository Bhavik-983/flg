/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// ----------------------------------------------------------------------
import { useEffect } from 'react';
import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
import AddProjectModal from './components/projects/AddProjectModal';
import { useAppSelector } from './store/hooks';
import { selectProjects } from './store/slices/projectSlice';
import useProject from './components/projects/use-projects';

// ----------------------------------------------------------------------

export default function App() {
  const charAt = `
  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██
  `;

  console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();
  const addProjectModal = useProject();
  const allProjects = useAppSelector(selectProjects);
  useEffect(() => {
    if (allProjects.length === 0) {
      addProjectModal.openAddProjectModal();
    }
  });

  return (
    <>
      <AuthProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              {/* <SettingsDrawer /> */}
              <ProgressBar />
              <Router />
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </AuthProvider>
      <AddProjectModal
        open={addProjectModal.open}
        closeModal={addProjectModal.closeAddProjectModal}
      />
    </>
  );
}


