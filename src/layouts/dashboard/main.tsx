/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

import useProjectHook from 'src/hooks/use-project-hook';
import { useResponsive } from 'src/hooks/use-responsive';
import useLanguageHook from 'src/hooks/use-language-hook';
import useRegisterHook from 'src/hooks/use-register-hook';
import useProjectModal from 'src/hooks/use-projects-modal';

import { useSettingsContext } from 'src/components/settings';
import AddProjectModal from 'src/components/modal/AddProjectModal';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

// const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  const settings = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');
  const isNavHorizontal = settings.themeLayout === 'horizontal';
  const isNavMini = settings.themeLayout === 'mini';

  const addProjectModal = useProjectModal();

  const { handleGetAllProjects } = useProjectHook();
  const { handleGetLanguages } = useLanguageHook();
  const { handleGetUser } = useRegisterHook();

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    handleGetAllProjects()
      .then((res: any) => {
        if (res?._id) {
          handleGetLanguages(res?._id);
        } else {
          addProjectModal.openAddProjectModal();
        }
      })
      .catch((e) => {});
  }, []);

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: `${HEADER.H_MOBILE + 24}px`,
          pb: 10,
          ...(lgUp && {
            pt: `${HEADER.H_MOBILE * 2 + 40}px`,
            pb: 15,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          // py: `${HEADER.H_MOBILE + SPACING}px`,
          ...(lgUp && {
            px: 2,
            // py: `${HEADER.H_DESKTOP + SPACING}px`,
            width: `calc(100% - ${NAV.W_VERTICAL}px)`,
            ...(isNavMini && {
              width: `calc(100% - ${NAV.W_MINI}px)`,
            }),
          }),
          ...sx,
        }}
        {...other}
      >
        {children}
      </Box>
      <AddProjectModal
        isOpen={addProjectModal.open}
        onClose={addProjectModal.closeAddProjectModal}
        isNotClose
      />
    </>
  );
}
