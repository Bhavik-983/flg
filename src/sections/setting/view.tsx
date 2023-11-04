import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function SettingView() {
  return (
    <>
      <Typography variant="h4" sx={{ my: '10px', color: '#444444' }}>
        Setting{' '}
      </Typography>

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
