import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@mui/material';

interface ButtonProps {
  title: string;
  onOpen?: any;
}

const AddButton = ({ title, onOpen }: ButtonProps) => (
  <Button
    variant="contained"
    color="primary"
    onClick={() => {
      onOpen();
    }}
  >
    <AiOutlinePlus
      style={{
        width: '1.5rem',
        height: '1.2rem',
        fontWeight: 'bold',
      }}
    />
    {title}
  </Button>
);

export default AddButton;
