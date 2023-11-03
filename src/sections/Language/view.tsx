import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import useLanguage from 'src/hooks/use-language';

import { useAppSelector } from 'src/store/hooks';
import { currentProjects } from 'src/store/slices/projectSlice';
import { ProjectLanguage, selectProjectLanguage } from 'src/store/slices/LanguageSlice';

import LanguageListCard from 'src/components/languages/LanguageListCard';
import AddLanguageModal from 'src/components/languages/AddLanguageModal';
import AddLanguageButton from 'src/components/languages/AddLanguageButton';

// ----------------------------------------------------------------------

export default function LanguageView() {
  const currentProj = useAppSelector(currentProjects);
  const languageModal = useLanguage();
  const languages = useAppSelector(selectProjectLanguage);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedID, setSelectedId] = useState<string | undefined>('');
  const projLanguage = languages.filter(
    (data: ProjectLanguage) => data.projectID === currentProj.projectID
  );

  const handleAddLanguage = () => {
    languageModal.openAddLanguage();
  };

  return (
    <>
      <Typography variant="h4"> Languages </Typography>
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
      >
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
            <AddLanguageButton handleClick={handleAddLanguage} />
            {projLanguage.length > 0
              ? projLanguage?.map((data: ProjectLanguage) => (
                  <LanguageListCard
                    name={data.name}
                    code={data.code}
                    handleOpen={languageModal.openAddLanguage}
                    handleClick={() => {
                      console.log('click');
                    }}
                    setIsEdit={setIsEdit}
                    setSelectedId={setSelectedId}
                    data={data}
                  />
                ))
              : ''}
          </Masonry>
        </ResponsiveMasonry>
      </Box>

      {/* ADD LANGUAGE MODAL */}
      <AddLanguageModal
        isEdit={isEdit}
        open={languageModal.open}
        handleClose={languageModal.closeAddLanguage}
        setIsEdit={setIsEdit}
        selectedID={selectedID}
      />
    </>
  );
}
