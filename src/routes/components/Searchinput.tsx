import { Box, TextField } from '@mui/material';

interface SearchProps {
  handleSearchData?: any;
}

const Searchinput = ({ handleSearchData }: SearchProps) => (
  <Box
    sx={{
      mt: 3,
      width: 400,
    }}
  >
    <TextField
      fullWidth
      id="outlined-search"
      onChange={(e) => handleSearchData(e.target.value)}
      label="Search field"
      type="search"
    />
  </Box>
);

export default Searchinput;
