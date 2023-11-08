import { BiPlus } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/Ai';

import { Box, AppBar, Toolbar } from '@mui/material';

// hooks
import usePageModal from 'src/hooks/use-page-modal';

import AddButton from 'src/components/button/AddButton';
import AddPageModal from 'src/components/modal/AddPageModal';
import FormAutoComplete from 'src/components/form/FormAutoComplete';

interface KeyHeaderProps {
  page: LabelValue;
  projectPages: LabelValue[];
  handleChange: (event: React.SyntheticEvent, newValue: LabelValue | null) => void;
  handleAddString: any;
}

const KeyHeader = ({ page, projectPages, handleChange, handleAddString }: KeyHeaderProps) => {
  // modal
  const pageModal = usePageModal();

  return (
    <>
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ px: '0 !important' }}>
            <FormAutoComplete value={page} options={projectPages} handleChange={handleChange} />

            <Box sx={{ mr: 2, flexGrow: 1 }}>
              <AddButton
                text="Add Page"
                icon={<AiOutlineFileAdd />}
                handleClick={pageModal.openAddPageModal}
              />
            </Box>
            <AddButton text="Add String" icon={<BiPlus />} handleClick={handleAddString} />
          </Toolbar>
        </AppBar>
      </Box>
      <AddPageModal isOpen={pageModal.open} onClose={pageModal.closeAddPageModal} />
    </>
  );
};

export default KeyHeader;
