/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import pageService from 'src/services/pageServices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  Page,
  setPages,
  addCurrentPage,
  selectAllPages,
  selectCurrentPage,
} from 'src/store/slices/pageSlice';

import useProjectHook from './use-project-hook';

const usePageHook = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const { currentProject } = useProjectHook();
  const allPages: Page[] = useAppSelector(selectAllPages);
  const currentPage = useAppSelector(selectCurrentPage);

  console.log(allPages);

  // const projectPages = Array.isArray(allPages)
  //   ? allPages.reduce((result: LabelValue[], data: any) => {
  //       // if (data.projectID === currentProject._id) {
  //       result.push({
  //         label: data?.name,
  //         value: data?._id,
  //       });
  //       // }
  //       return result;
  //     }, [])
  //   : [];

  const projectPages =
    allPages &&
    allPages.map((page) => ({
      label: page.name,
      value: page._id,
    }));

  const defaultPage = projectPages.find((projectPage) => projectPage.label === 'default');

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
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      const newPage = {
        name: response?.data?.name,
        _id: response?.data?._id,
        projectID,
      };
      await handleGetPagesName(currentProject?._id);
      dispatch(addCurrentPage(newPage));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPage = (pageValue: LabelValue) => {
    setPage(pageValue);
    const newCurrentPage = {
      _id: currentProject._id,
      name: pageValue.label,
    };
    dispatch(addCurrentPage(newCurrentPage));
  };

  const handleGetPagesName = async (projectId: string) => {
    try {
      const response = await pageService.getPageName(projectId);
      console.log(response);
      const allgetpage = response?.data?.pages || [];
      dispatch(setPages(allgetpage));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDefaultPage = async (projectId: string) => {
    try {
      const response = await pageService.addPage({ name: 'Default' }, projectId);
      const newPage = {
        pageName: response?.data?.name,
        pageID: response?.data?._id,
        projectId,
      };
      dispatch(addCurrentPage(newPage));
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
