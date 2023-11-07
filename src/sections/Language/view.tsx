import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import useLanguageHook from 'src/hooks/use-language-hook';
import useLanguageModal from 'src/hooks/use-language-modal';

import { Language } from 'src/store/slices/LanguageSlice';

import AddLanguageModal from 'src/components/languages/AddLanguageModal';
import LanguageListCard from 'src/components/languages/LanguageListCard';
import AddLanguageButton from 'src/components/languages/AddLanguageButton';

// ----------------------------------------------------------------------

export default function LanguageView() {
  const languageModal = useLanguageModal();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const { projectLanguages } = useLanguageHook();

  const handleAddLanguage = () => {
    setIsEdit(false);
    setSelectedId('');
    languageModal.openAddLanguage();
  };

  const handleEditLanguage = (id: string) => {
    setIsEdit(true);
    setSelectedId(id);
    languageModal.openAddLanguage();
  };

  return (
    <>
      <Typography variant="h4" sx={{ my: '10px', color: '#444444' }}>
        Languages
      </Typography>
      <Box
        sx={{
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
            {projectLanguages.length > 0
              ? projectLanguages?.map((data: Language) => (
                  <LanguageListCard
                    name={data.name}
                    code={data.code}
                    data={data}
                    handleEdit={handleEditLanguage}
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
        selectedId={selectedId}
      />
    </>
  );
}
