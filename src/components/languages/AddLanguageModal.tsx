import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

import { hideScroll } from 'src/theme/css';
import { currentProjects } from 'src/store/slices/projectSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  Language,
  addProjectLanguage,
  selectLanguageData,
  editProjectLanguage,
  selectProjectLanguage,
} from 'src/store/slices/LanguageSlice';

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
  pt: 4,
  pb: 8,
  p: 4,
  ...hideScroll.y,
};

interface AddLanguageModalType {
  isEdit: boolean;
  open: boolean;
  handleClose: () => void;
  setIsEdit: (x: boolean) => void;
  selectedID: string | undefined;
}

const AddLanguageModal = ({
  isEdit,
  open,
  handleClose,
  setIsEdit,
  selectedID,
}: AddLanguageModalType) => {
  const allLanguages = useAppSelector(selectLanguageData);
  const projectLanguage = useAppSelector(selectProjectLanguage);
  const dispatch = useAppDispatch();
  const currentProj = useAppSelector(currentProjects);
  const [languageData, setLanguageData] = useState<Language[]>(allLanguages);

  const handleSearch = (language: string) => {
    const updatedData =
      allLanguages &&
      allLanguages.filter((data: Language) => {
        if (data.name.toLowerCase().includes(language.toLowerCase())) {
          return data;
        }
        return undefined;
      });
    setLanguageData(updatedData);
  };

  const handleLanguage = (data: Language) => {
    if (isEdit === true) {
      handleEditLanguage(data);
    } else {
      handleAddLanguage(data);
    }
  };

  const handleAddLanguage = (data: Language) => {
    const newLanguage = {
      id: uuidv4(),
      projectId: currentProj.projectId,
      name: data.name,
      code: data.code,
      nativeName: data.nativeName,
    };
    dispatch(addProjectLanguage(newLanguage));
    setIsEdit(false);
    handleClose();
    setLanguageData(allLanguages);
  };

  const handleEditLanguage = (data: Language) => {
    const AlllanguageData = [...projectLanguage];
    const updatedLanguageData = AlllanguageData?.map((items) =>
      items.id === selectedID
        ? {
            ...items,
            name: data.name,
            code: data.code,
            nativeName: data.nativeName,
          }
        : items
    );
    dispatch(editProjectLanguage(updatedLanguageData));
    setIsEdit(false);
    handleClose();
  };

  const handleCloseModal = () => {
    setIsEdit(false);
    handleClose();
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
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                pb: 6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                position: 'absolute',
                top: '-43px',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '16%',
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
            <Box sx={{ mt: 13 }}>
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
                  {languageData.length > 0 &&
                    languageData.map((data: Language) => (
                      <Button
                        key={data.name}
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
                        onClick={() => handleLanguage(data)}
                      >
                        {data.name}
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
