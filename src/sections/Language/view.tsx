import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useAppSelector } from 'src/store/hooks';
import { ProjectLanguage, selectProjectLanguage } from 'src/store/slices/LanguageSlice';

import useLanguage from 'src/components/languages/use-language';
import LanguageListCard from 'src/components/languages/LanguageListCard';
import AddLanguageModal from 'src/components/languages/AddLanguageModal';
import AddLanguageButton from 'src/components/languages/AddLanguageButton';

// ----------------------------------------------------------------------

export default function LanguageView() {
  // const settings = useSettingsContext();
  const languageModal = useLanguage();
  const languages = useAppSelector(selectProjectLanguage);

  const handleAddLanguage = () => {
    languageModal.openAddLanguage();
    console.log(languageModal.open);
  };
  return (
    <>
      <Box
        sx={{
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
      >
        <Typography variant="h4"> Languages </Typography>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            100: 1,
            702: 2,
            892: 3,
            925: 4,
            1150: 4,
            1200: 5,
            1448: 6,
            1838: 7,
            1840: 8,
          }}
        >
          <Masonry>
            <LanguageListCard
              handleEdit={() => {
                console.log('edit');
              }}
              handleClick={() => {
                console.log('click');
              }}
            />
            {languages.length > 0 &&
              languages?.map((data: ProjectLanguage) => (
                <LanguageListCard
                  handleEdit={() => {
                    console.log('edit');
                  }}
                  handleClick={() => {
                    console.log('click');
                  }}
                />
              ))}
            <AddLanguageButton handleClick={handleAddLanguage} />
          </Masonry>
        </ResponsiveMasonry>
      </Box>

      {/* ADD LANGUAGE MODAL */}
      <AddLanguageModal open={languageModal.open} handleClose={languageModal.closeAddLanguage} />
    </>
  );
}
