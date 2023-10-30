import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@mui/material';

interface ButtonProps {
  title: string;
  handleClick?: any;
}

const AddButton = ({ title, handleClick }: ButtonProps) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
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
