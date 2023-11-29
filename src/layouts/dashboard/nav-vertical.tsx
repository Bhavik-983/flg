/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { m } from 'framer-motion';
import { VscAdd } from 'react-icons/vsc';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { Divider, MenuItem, IconButton, Typography } from '@mui/material';

import { usePathname } from 'src/routes/hooks';

import useProject from 'src/hooks/use-projects-modal';
import useProjectHook from 'src/hooks/use-project-hook';
import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import { hideScroll } from 'src/theme/css';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ProjectType, currentProjects, setCurrentProject } from 'src/store/slices/projectSlice';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import NavSectionVertical from 'src/components/nav-section/vertical/nav-section-vertical';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import AccountPopover from '../common/account-popover';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { user } = useMockedUser();
  const dispatch = useAppDispatch();
  // const projects = useAppSelector(selectProjects);
  const currentProject = useAppSelector(currentProjects);
  const projectModal = useProject();
  const pathname = usePathname();
  const popover = usePopover();
  console.log(currentProject);
  const { allProjects } = useProjectHook();

  const lgUp = useResponsive('up', 'lg');

  const handleClickItem = (project: ProjectType) => {
    dispatch(setCurrentProject(project));
    projectModal.closeAddProjectModal();
    popover.onClose();
  };

  const handleAddProject = () => {
    projectModal.openAddProjectModal();
    popover.onClose();
  };

  const navData = useNavData();
  // const handleClickItem = (path: string) => {
  //   popover.onClose();
  //   router.push(path);
  // };
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

      <IconButton
        component={m.button}
        whileTap="tap"
        onClick={popover.onOpen}
        sx={{
          borderRadius: '0',
          '&:hover:': {
            background: 'red',
          },
        }}
      >
        <Box
          sx={{
            borderRadius: 1,
            height: 52,
            width: '100%',
            backgroundImage: `linear-gradient(to top, #e0e0e07d 0%, #d7d7d782 100%)`,
            display: 'flex',
            pl: 2,
            alignItems: 'center',
            textTransform: 'capitalize',
          }}
        >
          {currentProject.name}
        </Box>
      </IconButton>

      <NavSectionVertical
        data={navData}
        slotProps={{
          currentRole: user?.role,
        }}
      />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ height: 405, width: 300, p: 0 }}
      >
        <Box sx={{ p: 2, py: 2.5 }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ fontSize: '19px', textTransform: 'capitalize' }}
          >
            {currentProject?.name[0]}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1, height: 289, ...hideScroll.y }}>
          {allProjects?.map((project: any) => (
            <MenuItem
              key={project.name}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onClick={() => handleClickItem(project)}
            >
              {project?.name}
            </MenuItem>
          ))}
        </Stack>
        <Box
          sx={{
            p: 1,
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            pl: 2,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(145, 158, 171, 0.08)',
            },
            position: 'absolute',
            left: 0,
            bottom: '4px',
            width: '100%',
          }}
          onClick={handleAddProject}
        >
          <VscAdd
            style={{
              height: 20,
              width: 20,
              paddingRight: 2,
            }}
          />
          <Typography>Add Project</Typography>
        </Box>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        {/* i want to one button */}
      </CustomPopover>
      <Box
        sx={{
          borderRadius: 1,
          height: 52,
          width: 59,
          ml: 1,
          position: 'absolute',
          bottom: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AccountPopover />
      </Box>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      {/* <NavToggleButton /> */}

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      {/* <Box
        sx={{
          borderRadius: 1,
          height: 50,
          width: 260,
          ml: 1,
          backgroundImage: `linear-gradient(to top, #1e40747d 0%, #31435c 100%)`,
          position: 'absolute',
          bottom: 50,
          pl: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AccountPopover />
      </Box> */}
    </Box>
  );
}
