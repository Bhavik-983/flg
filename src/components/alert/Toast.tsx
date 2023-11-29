import { Alert, AlertTitle } from '@mui/material';

interface ToastProps {
  title: string;
}

interface ErrorProps {
  title: string;
}

export const SuccessToast = ({ title }: ToastProps) => (
  <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    {title}
  </Alert>
);

export const ErrorToast = ({ title }: ErrorProps) => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {title}
  </Alert>
);
