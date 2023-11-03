import { useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/Ai';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAppSelector } from 'src/store/hooks';
import { Page, selectAllPages } from 'src/store/slices/pageSlice';

import usePage from 'src/components/keys/use-page';
import AddPageModal from 'src/components/keys/AddPageModal';
import { BiPlus } from 'react-icons/bi';

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
  const [page, setPage] = useState('');
  const allPages = useAppSelector(selectAllPages);

  const handleChange = (event: SelectChangeEvent) => {
    setPage(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, pb: 3 }}>
        <AppBar position="static">
          <Toolbar sx={{ px: '0 !important' }}>
            <Box sx={{ minWidth: 250, mr: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{ background: 'white', px: 1 }}>
                  Select Page
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={page}
                  label="Pages"
                  onChange={handleChange}
                >
                  {allPages.length > 0 &&
                    allPages?.map((data: Page) => (
                      <MenuItem
                        value={10}
                        key={data.pageID}
                        sx={{ textTransform: 'capitalize', py: 1 }}
                      >
                        {data.pageName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
        open={pageModal.open}
        closeModal={pageModal.closeAddPageModal}
        currentProjId={currentProjId}
      />
    </>
  );
};

export default KeyHeader;
