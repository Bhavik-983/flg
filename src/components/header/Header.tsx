import { Box, Typography } from '@mui/material';

import { useAppSelector } from 'src/store/hooks';
import { currentProjects } from 'src/store/slices/projectSlice';
import { selectProjectLanguage } from 'src/store/slices/LanguageSlice';

export default function CustomHeader() {
  const currentProject = useAppSelector(currentProjects);
  const currentLanguage = useAppSelector(selectProjectLanguage);

  const languageCount = currentLanguage.length;
  console.log({ currentLanguage });
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid #e0e0e0',
        py: 2,
        mb: 3,
        gap: 5,
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          color: '#303030',
        }}
        variant="h4"
      >
        {currentProject?.projectName}
      </Typography>
      <Typography sx={{ mt: 1 }} variant="h6">
        {languageCount} {languageCount === 1 ? 'Language' : 'Languages'}
      </Typography>
    </Box>
  );
}
