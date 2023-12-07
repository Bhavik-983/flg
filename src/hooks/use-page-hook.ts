/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import { useState } from 'react';

import { useAppDispatch } from 'src/store/hooks';
import pageService from 'src/services/pageServices';
import { addCurrentPage } from 'src/store/slices/pageSlice';

import useProjectHook from './use-project-hook';

const usePageHook = () => {
  const dispatch = useAppDispatch();
  const { currentProject } = useProjectHook();
  // const allPages: Page[] = useAppSelector(selectAllPages);
  // const currentPage = useAppSelector(selectCurrentPage);

  // const projectPages = allPages.reduce((result: LabelValue[], data: Page) => {
  //   if (data.projectID === currentProject._id) {
  //     result.push({
  //       label: data.pageName,
  //       value: data.pageID,
  //     });
  //   }
  //   return result;
  // }, []);

  // const defaultPage = projectPages.find((projectPage) => projectPage.label === 'Default');

  const [allPages, setAllPages] = useState<LabelValue[]>([]);
  const [currentPage, setcurrentPage] = useState<LabelValue>({
    label: '',
    value: '',
  });

  // const [page, setPage] = useState<LabelValue>(
  //   defaultPage !== undefined
  //     ? defaultPage
  //     : {
  //         label: '',
  //         value: '',
  //       }
  // );

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
      // dispatch(addPages(newPage));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPage = (pageValue: LabelValue) => {
    // setPage(pageValue);
    const newCurrentPage = {
      projectID: currentProject._id,
      pageName: pageValue.label,
      pageID: pageValue.value,
    };
    dispatch(addCurrentPage(newCurrentPage));
  };

  const handleGetAllPages = async (id: string) => {
    try {
      const response = await pageService.getPageName(id);

      let currentPage: LabelValue = {
        label: '',
        value: '',
      };

      const allData: LabelValue[] = response.map((res: { name: string; _id: string }) => {
        if (res?.name === 'default') {
          currentPage = {
            label: res?.name,
            value: res?._id,
          };
        }
        return {
          label: res?.name,
          value: res?._id,
        };
      });

      setAllPages(allData);
      setcurrentPage(currentPage);

      return currentPage;
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
    // projectPages,
    // defaultPage,
    // page,
    handleAddPage,
    currentPage,
    handleGetAllPages,
    fetchDefaultPage,
    allPages,
  };
};

export default usePageHook;
