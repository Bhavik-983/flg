import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
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

export default function ThreeView() {
  const settings = useSettingsContext();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'createdat', headerName: 'CreatedAt', width: 200 },
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
    { id: 1, name: 'Snow', createdat: '23/10/2020', status: true },
    { id: 2, name: 'Lannister', createdat: '20/02/2021', status: false },
    { id: 3, name: 'Lannister', createdat: '25/05/2022', status: true },
    { id: 4, name: 'Stark', createdat: '22/03/2023', status: true },
  ];
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box display="flex" justifyContent="space-between" width="full">
          <Typography variant="h4"> Page </Typography>
          <AddButton title="Add Page" />
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
