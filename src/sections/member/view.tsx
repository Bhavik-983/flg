import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function MemberView() {
  return (
    <>
      <Typography variant="h4"> Member </Typography>

      <Box
        sx={{
          mt: '40px',
          width: 0.99,
          marginLeft: 'auto',
          marginRight: 'auto',
          minHeight: 400,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          py: 4,
          px: 4,
        }}
      />
    </>
  );
}
