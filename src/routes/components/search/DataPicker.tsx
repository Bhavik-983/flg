import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
  value?: any;
  handleSearchData?: any;
}

export default function BasicDatePicker({ value, handleSearchData }: DatePickerProps) {
  return (
    <Box
      sx={{
        mt: 3,
        width: 200,
      }}
    >
      <DatePicker value={value} onChange={(e: any, data) => handleSearchData(data)} />
    </Box>
  );
}
