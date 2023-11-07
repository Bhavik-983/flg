import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Page, addCurrentPage, selectAllPages } from 'src/store/slices/pageSlice';

import useProjectHook from './use-project-hook';

const usePageHook = () => {
  const dispatch = useAppDispatch();
  const { currentProject } = useProjectHook();
  const allPages: Page[] = useAppSelector(selectAllPages);

  const projectPages = allPages.reduce((result: LabelValue[], data: Page) => {
    if (data.projectID === currentProject.projectID) {
      result.push({
        label: data.pageName,
        value: data.pageID,
      });
    }
    return result;
  }, []);

  const defaultPage = projectPages.find((projectPage) => projectPage.label === 'Default');

  const [page, setPage] = useState<LabelValue>(
    defaultPage !== undefined
      ? defaultPage
      : {
          label: '',
          value: '',
        }
  );

  const handleAddPage = (pageValue: LabelValue) => {
    setPage(pageValue);
    const newCurrentPage = {
      projectID: currentProject.projectID,
      pageName: pageValue.label,
      pageID: pageValue.value,
    };
    dispatch(addCurrentPage(newCurrentPage));
  };

  return { projectPages, defaultPage, page, handleAddPage };
};

export default usePageHook;
