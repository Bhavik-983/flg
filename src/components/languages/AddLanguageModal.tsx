import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Box, Fade, Modal, Backdrop, Typography } from '@mui/material';

import { hideScroll } from 'src/theme/css';
import { useAppSelector } from 'src/store/hooks';
import { AllLanguage, selectLanguageData } from 'src/store/slices/LanguageSlice';

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
  py: 10,
  p: 4,
  ...hideScroll.y,
};

interface AddLanguageModalType {
  open: boolean;
  handleClose: () => void;
}

const AddLanguageModal = ({ open, handleClose }: AddLanguageModalType) => {
  const allLanguages = useAppSelector(selectLanguageData);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
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
              {allLanguages.length > 0 &&
                allLanguages?.map((data: AllLanguage) => (
                  <Typography sx={{ fontSize: '16px', py: 1, pr: 1 }}>{data.name}</Typography>
                ))}
            </Masonry>
          </ResponsiveMasonry>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddLanguageModal;
