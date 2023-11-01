import { memo } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavProps, NavGroupProps } from '../types';

// ----------------------------------------------------------------------

function NavSectionMini({ data, slotProps, ...other }: NavProps) {
  return (
    <Stack component="nav" id="nav-section-mini" spacing={`${slotProps?.gap || 4}px`} {...other}>
      {data.map((group, index) => (
        <Group key={group.subheader || index} items={group.items} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

function Group({ items, slotProps }: NavGroupProps) {
  return (
    <>
      {items.map((list) => (
        <Box
        // sx={{
        //   borderRadius: 2,
        //   p: '0px 10px',
        //   bgcolor: 'rgba(145, 158, 171, 0.08)',
        // }}
        >
          <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
        </Box>
      ))}
    </>
  );
}
