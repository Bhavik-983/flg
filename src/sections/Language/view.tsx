import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiEditLine } from 'react-icons/ri';

import { GridColDef } from '@mui/x-data-grid';
import { Box, Container, Typography } from '@mui/material';

import BasicModal from 'src/routes/components/Modal';
import AddButton from 'src/routes/components/AddButton';
import DataTable from 'src/routes/components/DataTable';
import Searchinput from 'src/routes/components/Searchinput';
import DeleteModal from 'src/routes/components/modal/DeleteModal';
// Sample data
const rows = [
  { id: 1, name: 'English', key: 'EN', code: 'EN', status: true, createdat: '23/10/2020' },
  { id: 2, name: 'Hindi', key: 'HI', code: 'HI', status: true, createdat: '23/10/2020' },
  { id: 3, name: 'Gujarati', key: 'GUJ', code: 'GUJ', status: false, createdat: '23/10/2020' },
  { id: 4, name: 'Spanish', key: 'SP', code: 'Jp', status: true, createdat: '23/10/2020' },
];

interface LanguageData {
  id: number;
  name: string;
  key: string;
  code: string;
}

export default function OneView() {
  const [languageData, setLanguageData] = useState<LanguageData[]>(rows);
  const [searchInput, setSearchInput] = useState<string>('');
  const [tableData, setTableData] = useState<LanguageData[]>(rows);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleDeleteModalOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'key', headerName: 'Key', width: 200 },
    {
      field: 'code',
      headerName: 'Code',
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
      renderCell: () => (
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

  const handleSearchData = (value: string) => {
    setSearchInput(value);

    // Filter data based on the search input value
    const filteredData = languageData.filter((data) => {
      const loweredValue = value.toLowerCase();
      return (
        data.name.toLowerCase().includes(loweredValue) ||
        data.key.toLowerCase().includes(loweredValue) ||
        data.code.toLowerCase().includes(loweredValue)
      );
    });

    setTableData(filteredData);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box display="flex" width="100%" justifyContent="space-between">
          <Typography variant="h4"> Language </Typography>
          <AddButton onOpen={handleModalOpen} title="Add Language" />
        </Box>
        <Searchinput handleSearchData={handleSearchData} />
        <Box mt={5}>
          <DataTable rows={tableData} columns={columns} />
        </Box>
      </Container>
      <BasicModal isOpen={isOpen} onClose={handleModalClose} />
      <DeleteModal isOpen={isDeleteOpen} onClose={handleDeleteModalClose} />
    </>
  );
}
