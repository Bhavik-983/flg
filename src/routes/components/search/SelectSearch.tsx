import * as React from 'react';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface SearchProps {
  handleSearchData?: any;
  options?: any;
  value?: any;
}

export default function SelectSearch({ handleSearchData, options, value }: SearchProps) {
  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        onChange={(e: any, data) => handleSearchData(data)}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Status" value={value} />}
      />
    </Box>
  );
}
