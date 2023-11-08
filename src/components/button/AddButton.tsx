import { Button } from '@mui/material';

const buttonStyles = {
  '&:hover': {
    boxShadow: 'none', // Remove box shadow on hover
    borderColor: 'transparent', // Remove border color on hover
  },
  height: '55px',
  width: '129px',
  color: '#969ea6',
  fontSize: '15px',
};

interface AddButtonProps {
  handleClick: any;
  icon: React.ReactNode;
  text: string;
}

const AddButton = ({ handleClick, icon, text }: AddButtonProps) => (
    <Button onClick={handleClick} variant="outlined" startIcon={icon} sx={buttonStyles}>
      {text}
    </Button>
  );

export default AddButton;
