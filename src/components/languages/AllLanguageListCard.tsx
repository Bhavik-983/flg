import { Card, CardContent } from '@mui/material';

import { Language } from 'src/store/slices/LanguageSlice';

interface LanguageTypes {
  handleClick: () => void;
  data: Language[];
}

const AllLanguageListCard = ({ handleClick, data }: LanguageTypes) => (
  <Card
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      my: 1,
    }}
  >
    <CardContent>dfasd</CardContent>
  </Card>
);

export default AllLanguageListCard;
