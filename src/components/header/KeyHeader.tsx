/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/Ai';

import { Box, AppBar, Toolbar } from '@mui/material';

import usePageHook from 'src/hooks/use-page-hook';
// hooks
import usePageModal from 'src/hooks/use-page-modal';

import { useAppSelector } from 'src/store/hooks';
import { selectAllPages } from 'src/store/slices/pageSlice';

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
  const getPageName = useAppSelector(selectAllPages);
  const { fetchDefaultPage } = usePageHook();
  console.log({ getPageName });

  useEffect(() => {
    if (getPageName.length === 0) {
      fetchDefaultPage();
    }
  }, [getPageName]);

  const allPages = getPageName[0]?.rows || []; // Extracting all pages from the store

  const pageOptions =
    allPages &&
    allPages.map((item: any) => ({
      label: item?.name,
      value: item?._id,
    }));

  const pageModal = usePageModal();
  return (
    <>
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ px: '0 !i.mportant' }}>
            <FormAutoComplete value={page} options={pageOptions} handleChange={handleChange} />

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
