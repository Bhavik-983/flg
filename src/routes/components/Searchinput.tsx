import { Box, TextField } from '@mui/material';

interface SearchProps {
  handleSearchData?: any;
  labeltext?: string;
  value?: any;
}

const Searchinput = ({ handleSearchData, labeltext, value }: SearchProps) => (
  <Box
    sx={{
      mt: 3,
      width: 200,
    }}
  >
    <TextField
      fullWidth
      id="outlined-search"
      onChange={(e) => handleSearchData(e.target.value)}
      value={value}
      // label={`${labeltext} ? ${labeltext} : "Search field"`}
      label={labeltext || 'Search field'}
      type="search"
    />
  </Box>
);

export default Searchinput;
