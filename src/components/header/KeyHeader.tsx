/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/Ai';

import { Box, AppBar, Toolbar } from '@mui/material';

import usePageHook from 'src/hooks/use-page-hook';
// hooks
import usePageModal from 'src/hooks/use-page-modal';
import useProjectHook from 'src/hooks/use-project-hook';

import AddButton from 'src/components/button/AddButton';
import AddPageModal from 'src/components/modal/AddPageModal';
import FormAutoComplete from 'src/components/form/FormAutoComplete';

interface KeyHeaderProps {
  page: LabelValue;
  projectPages?: LabelValue[];
  handleChange: (event: React.SyntheticEvent, newValue: LabelValue | null) => void;
  handleAddString: any;
}

const KeyHeader = ({ page, handleChange, projectPages, handleAddString }: KeyHeaderProps) => {
  console.log({ projectPages });
  const { handleGetPagesName, pagedata } = usePageHook();
  const { currentProject } = useProjectHook();

  console.log({ page });

  const allPages =
    pagedata && pagedata?.map((pages: any) => ({ label: pages?.name, value: pages?._id }));

  const defaultPage = allPages[0];
  console.log({ defaultPage });

  useEffect(() => {
    handleGetPagesName(currentProject?._id);
  }, []);

  const pageModal = usePageModal();
  return (
    <>
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ px: '0 !i.mportant' }}>
            <FormAutoComplete
              defaultValue={allPages.find((item) => item.label === 'default')}
              value={page}
              options={allPages}
              handleChange={handleChange}
            />

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
