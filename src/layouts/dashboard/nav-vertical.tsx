import { useEffect } from 'react';
import { m } from 'framer-motion';
import { VscAdd } from 'react-icons/vsc';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Divider, MenuItem, Typography } from '@mui/material';

import { useRouter, usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import NavSectionVertical from 'src/components/nav-section/vertical/nav-section-vertical';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import AccountPopover from '../common/account-popover';
import NavToggleButton from '../common/nav-toggle-button';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '/#1',
  },
  {
    label: 'Settings',
    linkTo: '/#2',
  },
  {
    label: 'Settings',
    linkTo: '/#2',
  },
  {
    label: 'Settings',
    linkTo: '/#2',
  },
  {
    label: 'Settings',
    linkTo: '/#2',
  },
];

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { user } = useMockedUser();

  const pathname = usePathname();
  const popover = usePopover();
  const router = useRouter();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();
  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };
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
        // whileHover="hover"
        // variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          borderRadius: '0',
        }}
      >
        <Box
          sx={{
            borderRadius: 1,
            height: 50,
            width: '100%',
            backgroundImage: `linear-gradient(to top, #1e40747d 0%, #31435c 100%)`,
            display: 'flex',
            // justifyContent: 'center',
            pl: 1,
            alignItems: 'center',
            fontSize: '1.1rem',
          }}
        >
          Project
        </Box>
      </IconButton>

      <NavSectionVertical
        data={navData}
        slotProps={{
          currentRole: user?.role,
        }}
      />
      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 300, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1, overflowY: 'scroll', height: 90 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Box
          sx={{
            p: 1,
            display: 'flex',
            gap: 3,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(145, 158, 171, 0.08)',
            },
          }}
        >
          <VscAdd
            style={{
              height: 20,
              width: 20,
              paddingRight: 2,
            }}
          />
          Add Project
        </Box>
        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
      </CustomPopover>

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
      <NavToggleButton />

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
      <Box
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
      </Box>
    </Box>
  );
}
