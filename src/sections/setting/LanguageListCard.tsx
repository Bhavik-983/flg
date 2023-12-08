import { FiDownload } from 'react-icons/Fi';

import { Box, Card, Button, Typography, CardContent, CardActions } from '@mui/material';

import { NewLanguage } from 'src/store/slices/LanguageSlice';

interface LanguageTypes {
  name: string;
  code: string;
  data: NewLanguage;
  handleClick: (id: string) => void;
}

const LanguageListCard = ({ name, code, data, handleClick }: LanguageTypes) => (
  <Card
    sx={{
      width: '90%',
      height: 140,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      my: 1,
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
          cursor: 'pointer',
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'normal' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {code}
        </Typography>
      </Box>
    </CardContent>
    <CardActions
      sx={{
        position: 'absolute',
        top: 4,
        right: 2,
        p: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'end',
        height: '100%',
      }}
    >
      <Button
        sx={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          minWidth: 0,
          mb: 1,
        }}
        onClick={() => handleClick(data._id)}
      >
        <FiDownload />
      </Button>
    </CardActions>
  </Card>
);

export default LanguageListCard;
