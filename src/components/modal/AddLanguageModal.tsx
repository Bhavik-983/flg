import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Box, Fade, Modal, Divider, Backdrop } from '@mui/material';

import useLanguageHook from 'src/hooks/use-language-hook';

import { hideScroll } from 'src/theme/css';
import { DefaultLanguage } from 'src/store/slices/LanguageSlice';

import ModalSearchBar from 'src/sections/Language/ModalSearchBar';

import ListButton from '../button/ListButton';
import CloseLanguageModalButton from '../button/CloseLanguageModalButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  pb: 8,
  p: 4,
  pt: 0,
  ...hideScroll.y,
};

const wrapperStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
  position: 'sticky',
  background: 'white',
  top: 0,
  zIndex: 10,
  left: 0,
  height: '100px',
};

interface AddLanguageModalType {
  isEdit: boolean;
  open: boolean;
  handleClose: () => void;
  setIsEdit: (x: boolean) => void;
  selectedId: string;
}

const AddLanguageModal = ({
  isEdit,
  open,
  handleClose,
  setIsEdit,
  selectedId,
}: AddLanguageModalType) => {
  const { languages, handleSearch, resetLanguages, handleAddLanguage, handleEditLanguage } =
    useLanguageHook();

  const handleLanguage = (data: DefaultLanguage) => {
    const language = data;
    if (isEdit === true) {
      handleEditLanguage(language, selectedId, handleCloseModal);
    } else {
      handleAddLanguage(language, handleCloseModal);
    }
  };

  const handleCloseModal = () => {
    setIsEdit(false);
    handleClose();
    resetLanguages();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box>
            <Box sx={wrapperStyle}>
              <CloseLanguageModalButton handleCloseModal={handleCloseModal} />
              <ModalSearchBar handleSearch={handleSearch} />
              <Divider light />
            </Box>
            <Box sx={{ mt: 2 }}>
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  100: 1,
                  702: 2,
                  892: 2,
                  925: 2,
                  1150: 2,
                  1200: 3,
                  1448: 4,
                  1838: 5,
                  1840: 6,
                }}
              >
                <Masonry>
                  {languages.length > 0 &&
                    languages.map((language: DefaultLanguage) => (
                      <ListButton languageData={language} handleLanguage={handleLanguage} />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddLanguageModal;
