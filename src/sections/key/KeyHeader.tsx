import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/Ai';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { TextField, Autocomplete } from '@mui/material';

import usePage from 'src/hooks/use-page';

import { useAppSelector } from 'src/store/hooks';
import { currentProjects } from 'src/store/slices/projectSlice';
import { Page, selectAllPages } from 'src/store/slices/pageSlice';

import AddPageModal from 'src/components/modal/AddPageModal';

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
  handleAddString: () => void;
}

const KeyHeader = ({ handleAddString }: HeaderType) => {
  const currentProject = useAppSelector(currentProjects);
  const pageModal = usePage();
  const allPages = useAppSelector(selectAllPages);

  interface LabelValue {
    label: string;
    value: string;
  }

  const projectPages = allPages.reduce((result: LabelValue[], data: Page) => {
    if (data.projectID === currentProject.projectID) {
      result.push({
        label: data.pageName,
        value: data.pageID,
      });
    }
    return result;
  }, []);

  const [page, setPage] = useState<LabelValue>(
    projectPages?.find((data: LabelValue) => data?.label === 'Default')
  );

  const handleChange = (event: React.SyntheticEvent, newValue: LabelValue | null) => {
    if (newValue !== null) {
      console.log({ newValue });
      setPage(newValue);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ px: '0 !important' }}>
            <Box sx={{ minWidth: 250, mr: 2 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={page}
                options={projectPages}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="page" />}
                onChange={(event, newValue) => handleChange(event, newValue as LabelValue | null)}
                clearIcon={null}
              />
            </Box>
            <Box sx={{ mr: 2, flexGrow: 1 }}>
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
      <AddPageModal isOpen={pageModal.open} onClose={pageModal.closeAddPageModal} />
    </>
  );
};

export default KeyHeader;

