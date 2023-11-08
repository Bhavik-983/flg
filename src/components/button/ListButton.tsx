import { Button } from '@mui/material';

import { DefaultLanguage } from 'src/store/slices/LanguageSlice';

interface ListButtonType {
  languageData: DefaultLanguage;
  handleLanguage: (x: DefaultLanguage) => void;
}

const ListButton = ({ languageData, handleLanguage }: ListButtonType) => (
  <Button
    key={languageData.name}
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
    onClick={() => handleLanguage(languageData)}
  >
    {languageData?.name}
  </Button>
);

export default ListButton;
