import { Box } from '@mui/material';

const Loader = () => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      display: 'grid',
      placeContent: 'center',
      zIndex: 9999,
      width: '100vw',
      height: '100vh',
      background: 'white',
    }}
  >
    loading...
  </Box>
);

export default Loader;
