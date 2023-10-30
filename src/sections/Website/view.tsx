/* eslint-disable react/jsx-no-undef */

import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiEditLine } from 'react-icons/ri';

import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AddButton from 'src/routes/components/AddButton';
import DataTable from 'src/routes/components/DataTable';
import Searchinput from 'src/routes/components/Searchinput';
import DeleteModal from 'src/routes/components/modal/DeleteModal';
import WebsiteModal from 'src/routes/components/modal/WebsiteModal';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

const rows = [
  { id: 1, name: 'Snow', createdat: '23/10/2020', status: true, url: 'https://www.google.com' },
  {
    id: 2,
    name: 'Lannister',
    createdat: '22/10/2020',
    status: false,
    url: 'https://www.facebook.com',
  },
  {
    id: 3,
    name: 'Lannister',
    createdat: '20/10/2020',
    status: false,
    url: 'https://www.amazon.com',
  },
  {
    id: 4,
    name: 'Stark',
    createdat: '10/10/2020',
    status: true,
    url: 'https://www.instagram.com',
  },
];
interface WebsiteData {
  id: number;
  name: string;
  url: string;
}
export default function TwoView() {
  const [websiteData, setWebsiteData] = useState<WebsiteData[]>(rows);
  const [searchInput, setSearchInput] = useState<string>('');
  const [tableData, setTableData] = useState<WebsiteData[]>(rows);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const settings = useSettingsContext();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'url', headerName: 'Url', width: 250 },
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

  const handleSearchData = (value: string) => {
    setSearchInput(value);

    // Filter data based on the search input value
    const filteredData = websiteData.filter((data) => {
      const loweredValue = value.toLowerCase();
      return (
        data.name.toLowerCase().includes(loweredValue) ||
        data.url.toLowerCase().includes(loweredValue)
      );
    });

    setTableData(filteredData);
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box display="flex" justifyContent="space-between" width="full">
          <Typography variant="h4"> Website </Typography>
          <AddButton title="Add Website" handleClick={handleModalOpen} />
        </Box>
        <Searchinput handleSearchData={handleSearchData} />
        <Box mt={5}>
          <DataTable columns={columns} rows={tableData} />
        </Box>
      </Container>
      <WebsiteModal isOpen={isOpen} onClose={handleModalClose} />
      <DeleteModal isOpen={isDeleteOpen} onClose={handleDeleteModalClose} />
    </>
  );
}
