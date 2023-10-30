import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { RiEditLine } from 'react-icons/ri';

import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AddButton from 'src/routes/components/AddButton';
import DataTable from 'src/routes/components/DataTable';
import Searchinput from 'src/routes/components/Searchinput';
import DeleteModal from 'src/routes/components/modal/DeleteModal';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function FourView() {
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };
  const settings = useSettingsContext();
  const columns: GridColDef[] = [
    { field: 'key', headerName: 'Key', width: 200 },
    { field: 'page', headerName: 'Page', width: 200 },
    {
      field: 'languages',
      headerName: 'Languages',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.value === true ? 'success.true' : 'error.false',
            bgcolor: params.value === true ? 'success.bgtrue' : 'error.bgfalse',
            borderRadius: '6px',
            p: '0px 6px',
          }}
        >
          {params.value === true ? 'Active' : 'Inactive'}
        </Box>
      ),
    },
    {
      field: 'createdat',
      headerName: 'CreatedAt',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between" width="full" gap={1}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            <RiEditLine
              style={{
                width: 20,
                height: 20,
              }}
            />
          </Box>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            onClick={handleDeleteModalOpen}
          >
            <MdDelete
              style={{
                width: 20,
                height: 20,
              }}
            />
          </Box>
        </Box>
      ),
    },
  ];

  const rows = [
    { id: 1, key: 'JP', page: 'Jon', languages: 'Japanese', createdat: '23/10/2020', status: true },
    {
      id: 2,
      key: 'EN',
      page: 'Cersei',
      languages: 'English',
      createdat: '23/10/2020',
      status: false,
    },
    {
      id: 3,
      key: 'GUJ',
      page: 'Jaime',
      languages: 'Gujrati',
      createdat: '23/10/2020',
      status: true,
    },
    { id: 4, key: 'HI', page: 'Arya', languages: 'Hindi', createdat: '23/10/2020', status: false },
  ];

  const handleNavigate: any = () => {
    navigate('/dashboard/key/new');
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box display="flex" justifyContent="space-between" width="full">
          <Typography variant="h4"> Key </Typography>
          <AddButton title="Add Key" handleClick={handleNavigate} />
        </Box>
        <Searchinput />

        <Box mt={5}>
          <DataTable columns={columns} rows={rows} />
        </Box>
      </Container>
      <DeleteModal isOpen={isDeleteOpen} onClose={handleDeleteModalClose} />
    </>
  );
}
