import { FiEdit } from 'react-icons/Fi';

import { Box, Card, Button, Typography, CardContent, CardActions } from '@mui/material';

import { ProjectLanguage } from 'src/store/slices/LanguageSlice';

// import { ProjectLanguage } from 'src/store/slices/LanguageSlice';

interface LanguageTypes {
  name?: string;
  code?: string;
  handleClick: () => void;
  handleOpen: () => void;
  setIsEdit: (x: boolean) => void;
  setSelectedId: (x: string | undefined) => void;
  data: ProjectLanguage;
}

const LanguageListCard = ({
  handleClick,
  name,
  code,
  handleOpen,
  setIsEdit,
  setSelectedId,
  data,
}: LanguageTypes) => {
  const handleEdit = (value: string | undefined) => {
    setSelectedId(value);
    setIsEdit(true);
    handleOpen();
  };
  return (
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
          <Typography variant="h5" component="div" sx={{ fontWeight: 'normal' }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {code}
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
          onClick={() => handleEdit(data.id)}
        >
          <FiEdit />
        </Button>
      </CardActions>
    </Card>
  );
};

export default LanguageListCard;
