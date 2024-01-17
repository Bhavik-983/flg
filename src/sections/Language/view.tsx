import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import useLanguageHook from 'src/hooks/use-language-hook';
import useLanguageModal from 'src/hooks/use-language-modal';

import { NewLanguage } from 'src/store/slices/LanguageSlice';

import PageHeading from 'src/components/heading/PageHeading';
import { LoadingScreen } from 'src/components/loading-screen';
import AddLanguageModal from 'src/components/modal/AddLanguageModal';
import AddLanguageButton from 'src/components/languages/AddLanguageButton';

import LanguageListCard from './LanguageListCard';

// ----------------------------------------------------------------------

export default function LanguageView() {
  const languageModal = useLanguageModal();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const { projectLanguage, isLoading } = useLanguageHook();

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
  const headingText = 'Language';

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <PageHeading name={headingText} />
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
                {projectLanguage.length > 0
                  ? projectLanguage?.map((data: NewLanguage) => (
                      <LanguageListCard
                        key={data._id}
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

          <AddLanguageModal
            isEdit={isEdit}
            open={languageModal.open}
            handleClose={languageModal.closeAddLanguage}
            setIsEdit={setIsEdit}
            selectedId={selectedId}
          />
        </>
      )}
    </>
  );
}
