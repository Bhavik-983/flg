/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import { useState } from 'react';

import pageService from 'src/services/pageServices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  Page,
  addPages,
  setPages,
  addCurrentPage,
  selectAllPages,
  selectCurrentPage,
} from 'src/store/slices/pageSlice';

import useProjectHook from './use-project-hook';

const usePageHook = () => {
  const dispatch = useAppDispatch();
  const { currentProject } = useProjectHook();
  const allPages: Page[] = useAppSelector(selectAllPages);
  const currentPage = useAppSelector(selectCurrentPage);

  const projectPages = allPages.reduce((result: LabelValue[], data: Page) => {
    if (data.projectID === currentProject._id) {
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

  const createPage = async (pageName: string, projectID: string) => {
    try {
      const response = await pageService.addPage({ name: pageName }, projectID);
      console.log(response);
      const newPage = {
        pageName: response?.data?.name,
        pageID: response?.data?._id,
        projectID,
      };
      dispatch(addCurrentPage(newPage));
      dispatch(addPages(newPage));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPage = (pageValue: LabelValue) => {
    setPage(pageValue);
    const newCurrentPage = {
      projectID: currentProject._id,
      pageName: pageValue.label,
      pageID: pageValue.value,
    };
    dispatch(addCurrentPage(newCurrentPage));
  };

  const handleGetPagesName = async () => {
    try {
      const response = await pageService.getPageName();
      console.log(response);
      dispatch(setPages(response?.data));
      // return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDefaultPage = async (projectId: string) => {
    try {
      const response = await pageService.addPage({ name: 'New Default Page' }, projectId);
      console.log(response);
      const newPage = {
        pageName: response?.data?.name,
        pageID: response?.data?._id,
        projectId: currentProject?._id,
      };
      dispatch(addCurrentPage(newPage));
      dispatch(addPages(newPage));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createPage,
    projectPages,
    defaultPage,
    page,
    handleAddPage,
    currentPage,
    handleGetPagesName,
    fetchDefaultPage,
  };
};

export default usePageHook;
