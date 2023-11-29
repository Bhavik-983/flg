import { Box, Typography } from '@mui/material';

import useProjectHook from 'src/hooks/use-project-hook';
import useLanguageHook from 'src/hooks/use-language-hook';

export default function CustomHeader() {
  const { currentProject } = useProjectHook();
  const { projectLanguage } = useLanguageHook();

  let languageText;

  if (projectLanguage.length === 0) {
    languageText = 'Language ';
  } else if (projectLanguage.length === 1) {
    languageText = 'Language ';
  } else {
    languageText = 'Languages ';
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        px: 4,
        borderBottom: '1px solid #e0e0e0',
        py: 2,
        pl: {
          xs: 10,
          sm: 10,
          md: 10,
          lg: 2,
          xl: 0,
        },
        gap: 5,
        mb: 5,
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          color: '#444444',
          textTransform: 'capitalize',
        }}
        variant="h4"
      >
        {currentProject?.name}
      </Typography>
      <Box sx={{ border: '1px solid #dbdbdb', px: 1, py: '2px', borderRadius: '3px' }}>
        <Typography variant="h5" sx={{ fontSize: '14px', color: 'gray' }}>
          {languageText}
          {projectLanguage.length}
        </Typography>
      </Box>
    </Box>
  );
}
