import { BsSearch } from 'react-icons/Bs';
import { AiOutlineClose } from 'react-icons/Ai';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import {
  Box,
  Fade,
  Modal,
  Button,
  Divider,
  Backdrop,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import useLanguageHook from 'src/hooks/use-language-hook';

import { hideScroll } from 'src/theme/css';
import { DefaultLanguage } from 'src/store/slices/LanguageSlice';

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
            <Box
              sx={{
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
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '40%',
                  right: '-1%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 30,
                  cursor: 'pointer',
                  zIndex: 30,
                  '@media (max-width: 804px)': {
                    fontSize: 24,
                    top: '-36%',
                    right: '-1%',
                    transform: 'translate(50%, 50%)',
                  },
                }}
                onClick={handleCloseModal}
              >
                <AiOutlineClose />
              </Box>
              <FormControl sx={{ m: 1, width: '65ch' }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  placeholder="Search"
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        sx={{ fontSize: '16px', pr: 2 }}
                      >
                        <BsSearch />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
                      <Button
                        key={language.name}
                        sx={{
                          textAlign: 'left',
                          fontSize: '15px',
                          py: 1,
                          pr: 1,
                          display: 'flex',
                          justifyContent: 'start',
                          alignItems: 'center',
                          cursor: 'pointer',
                          color: 'gray',
                        }}
                        onClick={() => handleLanguage(language)}
                      >
                        {language?.name}
                      </Button>
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
