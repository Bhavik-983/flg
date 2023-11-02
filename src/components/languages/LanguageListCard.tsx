import { FiEdit } from 'react-icons/Fi';

import { Box, Card, Button, Typography, CardContent, CardActions } from '@mui/material';

interface LanguageTypes {
  handleEdit: () => void;
  handleClick: () => void;
}

const LanguageListCard = ({ handleEdit, handleClick }: LanguageTypes) => (
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
        onClick={handleClick}
      >
        <Typography variant="h5" component="div">
          English
        </Typography>
        <Typography variant="body2" color="text.secondary">
          EN
        </Typography>
      </Box>
    </CardContent>
    <CardActions sx={{ position: 'absolute', top: 4, right: 2, p: 0 }}>
      <Button
        sx={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          minWidth: 0,
        }}
        onClick={handleEdit}
      >
        <FiEdit />
      </Button>
    </CardActions>
  </Card>
);

export default LanguageListCard;
