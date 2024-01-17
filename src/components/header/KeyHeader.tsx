/* eslint-disable react-hooks/exhaustive-deps */
import { BiPlus } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/ai';

import { Box, AppBar, Toolbar } from '@mui/material';

// hooks
import usePageModal from 'src/hooks/use-page-modal';

import AddButton from 'src/components/button/AddButton';
import AddPageModal from 'src/components/modal/AddPageModal';
import FormAutoComplete from 'src/components/form/FormAutoComplete';

interface KeyHeaderProps {
  value: LabelValue;
  handleChange: (event: React.SyntheticEvent, newValue: LabelValue | null) => void;
  options: LabelValue[];
  handleAddString: any;
  handleAddPage: (pageName: string) => void;
}

const KeyHeader = ({
  value,
  handleChange,
  options,
  handleAddString,
  handleAddPage,
}: KeyHeaderProps) => {
  const pageModal = usePageModal();
  return (
    <>
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ px: '0 !i.mportant' }}>
            <FormAutoComplete value={value} options={options} handleChange={handleChange} />

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
      <AddPageModal
        isOpen={pageModal.open}
        onClose={pageModal.closeAddPageModal}
        handleAdd={handleAddPage}
      />
    </>
  );
};

export default KeyHeader;
