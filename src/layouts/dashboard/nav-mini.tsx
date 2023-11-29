/* eslint-disable react-hooks/exhaustive-deps */
import { m } from 'framer-motion';
import { VscAdd } from 'react-icons/vsc';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Box, Divider, MenuItem, Typography } from '@mui/material';

import useProjectHook from 'src/hooks/use-project-hook';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import useLanguageHook from 'src/hooks/use-language-hook';
import useProjectModal from 'src/hooks/use-projects-modal';

import { hideScroll } from 'src/theme/css';
import { ProjectType } from 'src/store/slices/projectSlice';

import Logo from 'src/components/logo';
import { NavSectionMini } from 'src/components/nav-section';
import AddProjectModal from 'src/components/modal/AddProjectModal';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import AccountPopover from '../common/account-popover';

export default function NavMini() {
  const { user } = useMockedUser();
  const popover = usePopover();

  const projectModal = useProjectModal();
  const { handleGetLanguages } = useLanguageHook();
  const { allProjects, currentProject, handleSetCurrentProject } = useProjectHook();

  const navData = useNavData();
  const handleClickItem = (project: ProjectType) => {
    handleSetCurrentProject(project);

    projectModal.closeAddProjectModal();
    popover.onClose();
    handleGetLanguages(project?._id);
  };

  const handleAddProject = () => {
    popover.onClose();
    projectModal.openAddProjectModal();
  };

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      {/* <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      /> */}

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <IconButton
          component={m.button}
          whileTap="tap"
          // whileHover="hover"
          // variants={varHover(1.05)}
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
              width: 59,
              backgroundImage: `linear-gradient(to top, #e0e0e07d 0%, #d7d7d782 100%)`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'capitalize',
            }}
          >
            {currentProject?.name.charAt(0)}
          </Box>
        </IconButton>

        <NavSectionMini
          data={navData}
          sx={{
            p: '0px 10px',
          }}
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
              {currentProject?.name}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack sx={{ p: 1, height: 289, ...hideScroll.y }}>
            {allProjects?.map((project: any) => (
              <MenuItem
                key={project.name}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography
                  margin="auto"
                  width="100%"
                  variant="subtitle2"
                  noWrap
                  onClick={() => handleClickItem(project)}
                >
                  {project?.name}
                </Typography>
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

        {/* Add Project Modal */}
        <AddProjectModal isOpen={projectModal.open} onClose={projectModal.closeAddProjectModal} />
      </Stack>
    </Box>
  );
}
