import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import PageHeading from 'src/components/heading/PageHeading';

// ----------------------------------------------------------------------

export default function SettingView() {
  const headingText = 'Setting';
  return (
    <>
      <PageHeading name={headingText} />

      <Box
        sx={{
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
    </>
  );
}
