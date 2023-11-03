import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/Ai';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { SelectChangeEvent } from '@mui/material/Select';

import { useAppSelector } from 'src/store/hooks';
import { Page, selectAllPages } from 'src/store/slices/pageSlice';

import usePage from 'src/components/keys/use-page';
import AddPageModal from 'src/components/modal/AddPageModal';
import { Autocomplete, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import { Select } from 'antd';

const buttonStyles = {
  '&:hover': {
    boxShadow: 'none', // Remove box shadow on hover
    borderColor: 'transparent', // Remove border color on hover
  },
  height: '55px',
  width: '129px',
  color: '#969ea6',
  fontSize: '15px',
};

interface HeaderType {
  currentProjId: string;
  handleAddString: () => void;
}

const KeyHeader = ({ currentProjId, handleAddString }: HeaderType) => {
  const pageModal = usePage();
  const [page, setPage] = useState<string | undefined>('');
  const allPages = useAppSelector(selectAllPages);

  const handleChange = (event: SelectChangeEvent) => {
    setPage(event.target.value as string);
  };
  const defaultLanguages = [
    { label: 'Project Manager' },
    { label: 'Developer' },
    { label: 'Translator' },
  ];
  console.log(allPages);

  return (
    <>
      <Box sx={{ flexGrow: 1, pb: 3 }}>
        <AppBar position="static">
          <Toolbar sx={{ px: '0 !important' }}>
            <Box sx={{ minWidth: 250, mr: 2 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={allPages.map((data: any) => data.pageName)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
              />
            </Box>
            <Box sx={{ mr: 2 }}>
              <Button
                onClick={pageModal.openAddPageModal}
                variant="outlined"
                startIcon={<AiOutlineFileAdd />}
                sx={buttonStyles}
              >
                Add Page
              </Button>
            </Box>
            <Button
              variant="outlined"
              startIcon={<BiPlus />}
              sx={buttonStyles}
              onClick={handleAddString}
            >
              Add String
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <AddPageModal
        isOpen={pageModal.open}
        onClose={pageModal.closeAddPageModal}
        currentProjId={currentProjId}
      />
    </>
  );
};

export default KeyHeader;

