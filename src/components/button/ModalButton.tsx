import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';

interface ModalButtonProps {
  handleClick: () => void;
  isSubmitting: boolean;
  title: string;
  loadingText: string;
  icon?: React.ReactNode;
}

const ModalButton = ({ handleClick, isSubmitting, title, loadingText, icon }: ModalButtonProps) => (
  <Box display="flex" justifyContent="flex-end" gap={2}>
    <Button
      sx={{
        border: '1px solid rgba(145, 158, 171, 0.32)',
      }}
      onClick={() => {
        handleClick();
      }}
    >
      {title}
    </Button>
    <LoadingButton
      color="inherit"
      size="medium"
      type="submit"
      variant="contained"
      loading={isSubmitting}
    >
      {icon}
      {loadingText}
    </LoadingButton>
  </Box>
);

export default ModalButton;
