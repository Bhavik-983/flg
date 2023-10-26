import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

// import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  // const renderLogo = (
  //   <Logo
  //     sx={{
  //       zIndex: 9,
  //       position: 'absolute',
  //       m: { xs: 2, md: 5 },
  //     }}
  //   />
  // );

  const renderContent = (
    <Stack
      justifyContent="center"
      sx={{
        width: 1,
        mx: 'auto',

        maxWidth: {
          xs: 480,
          lg: 560,
          xl: 820,
        },
        px: { xs: 4, md: 16, lg: 25, xl: 35 },
        // pt: { xs: 15, md: 20 },
        // pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} spacing={2} alignItems="center" justifyContent="center">
      <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title || 'Hi, Welcome'}
      </Typography>

      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/illustration_dashboard.png'}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 560,
            xl: 620,
          },
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row-reverse"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
        minHeight: '100vh',
      }}
    >
      {/* {renderLogo} */}

      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}
