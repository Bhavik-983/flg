import { Controller, useFormContext } from 'react-hook-form';

import { TextFieldProps } from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  value?: any;
  handleChange?: any;
};

export default function RHFDatePicker({ name, handleChange, value, type }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={value}
          onChange={(e, newValue) => {
            field.onChange(newValue); // Manually call the field's onChange to update the form value
            if (handleChange) {
              handleChange(newValue); // Call the handleChange prop with the new value
            }
          }}
        />
      )}
    />
  );
}
