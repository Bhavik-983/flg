import { Controller, useFormContext } from 'react-hook-form';

import { Box, Autocomplete } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  label: string;
  handleChange?: any;
  options: LabelValue[];
};

interface LabelValue {
  label: string;
  value: string;
}

export default function RHFSelectField({
  name,
  helperText,
  type,
  label,
  handleChange,
  options,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }: any) => (
        <Box width="100%">
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-demo"
            options={options}
            onChange={(e, newValue) => handleChange(name, newValue)}
            renderInput={(params) => (
              <TextField
                {...field}
                {...params}
                label={label}
                error={!!error}
                helperText={error ? error?.value?.message : helperText}
                {...other}
              />
            )}
          />
        </Box>
      )}
    />
  );
}
