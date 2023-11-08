import { Typography } from '@mui/material';

interface TitleType {
  name: string;
}

const PageHeading = ({ name }: TitleType) => (
  <Typography variant="h4" sx={{ my: '10px', color: '#444444' }}>
    {name}
  </Typography>
);

export default PageHeading;
