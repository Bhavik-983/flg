import { AiOutlineClose } from 'react-icons/ai';

import { Box } from '@mui/material';

interface ButtonTypes {
  handleCloseModal: () => void;
}
const style = {
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
};

const CloseLanguageModalButton = ({ handleCloseModal }: ButtonTypes) => (
  <Box sx={style} onClick={handleCloseModal}>
    <AiOutlineClose />
  </Box>
);

export default CloseLanguageModalButton;
