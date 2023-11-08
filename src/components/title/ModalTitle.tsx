import React from 'react';

import { Stack, Typography } from '@mui/material';

interface ModalTitleProps {
  title: string;
}

const ModalTitle = ({ title }: ModalTitleProps) => (
  <Stack spacing={2} sx={{ mb: 5 }}>
    <Typography variant="h4">{title}</Typography>
  </Stack>
);

export default ModalTitle;
