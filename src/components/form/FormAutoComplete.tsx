import { Box, TextField, Autocomplete } from '@mui/material';

interface FormAutoCompleteProps {
  value: LabelValue;
  options: LabelValue[];
  handleChange: (event: React.SyntheticEvent, newValue: LabelValue | null) => void;
}

const FormAutoComplete = ({ value, options, handleChange }: FormAutoCompleteProps) => (
  <Box sx={{ minWidth: 250, mr: 2 }}>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={value}
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="page" />}
      onChange={(event, newValue) => handleChange(event, newValue as LabelValue | null)}
      clearIcon={null}
    />
  </Box>
);

export default FormAutoComplete;
