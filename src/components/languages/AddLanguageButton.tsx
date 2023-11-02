import { BsPlusLg } from 'react-icons/Bs';

import { Card, Button } from '@mui/material';

interface LanguageTypes {
  handleClick: () => void;
}

const AddLanguageButton = ({ handleClick }: LanguageTypes) => (
  <Card
    sx={{
      background: '#efefef1a',
      width: '90%',
      height: 140,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      my: 1,
      p: 0,
    }}
  >
    <Button
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 0,
        fontSize: '40px',
      }}
      onClick={handleClick}
    >
      <BsPlusLg />
    </Button>
  </Card>
);
export default AddLanguageButton;
