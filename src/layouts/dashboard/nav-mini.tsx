import { m } from 'framer-motion';
import { VscAdd } from 'react-icons/vsc';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Box, Divider, MenuItem, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { hideScroll } from 'src/theme/css';

import Logo from 'src/components/logo';
import { NavSectionMini } from 'src/components/nav-section';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import AccountPopover from '../common/account-popover';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/dashboard',
  },
  {
    label: 'Language',
    linkTo: '/dashboard/languages',
  },
  {
    label: 'Member',
    linkTo: '/dashboard/member',
  },
  {
    label: 'Settings',
    linkTo: '/dashboard/setting',
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

export default function NavMini() {
  const { user } = useMockedUser();
  const popover = usePopover();
  const router = useRouter();

  const navData = useNavData();

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
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
          }}
        >
          <Box
            sx={{
              borderRadius: 1,
              height: 52,
              width: 59,
              backgroundImage: `linear-gradient(to top, #1e40747d 0%, #31435c 100%)`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            SS
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
          sx={{ height: 200, width: 300, p: 0 }}
        >
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
      </Stack>
    </Box>
  );
}
