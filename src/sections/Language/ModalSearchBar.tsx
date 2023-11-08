import { BsSearch } from 'react-icons/Bs';

import { IconButton, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

interface SearchBarType {
  handleSearch: (x: string) => void;
}

const ModalSearchBar = ({ handleSearch }: SearchBarType) => (
  <FormControl sx={{ m: 1, width: '65ch' }} variant="outlined">
    <OutlinedInput
      id="outlined-adornment-password"
      placeholder="Search"
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            edge="end"
            sx={{ fontSize: '16px', pr: 2 }}
          >
            <BsSearch />
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
);

export default ModalSearchBar;
