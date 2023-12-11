/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import pageService from 'src/services/pageServices';

import useProjectHook from './use-project-hook';

const usePageHook = () => {
  const { currentProject } = useProjectHook();
  const { enqueueSnackbar } = useSnackbar();

  const [allPages, setAllPages] = useState<LabelValue[]>([]);
  const [currentPage, setcurrentPage] = useState<LabelValue>({
    label: '',
    value: '',
  });

  const handleCreatePage = async (pageName: string, projectID: string) => {
    try {
      const response = await pageService.addPage({ name: pageName }, projectID);
      console.log(response);
      handleGetAllPages(currentProject?._id, response?.name);
      // enqueueSnackbar(response?.message, {
      //   variant: 'success',
      //   anchorOrigin: {
      //     vertical: 'top',
      //     horizontal: 'right',
      //   },
      //   autoHideDuration: 3000,
      // });
      return response;
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    }
  };

  const handleGetAllPages = async (projectId: string, pageName?: string) => {
    try {
      const response = await pageService.getPageName(projectId);

      let currentPage: LabelValue = {
        label: '',
        value: '',
      };

      const allData: LabelValue[] = response.map((res: { name: string; _id: string }) => {
        if (res?.name === pageName) {
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleCreatePage,
    currentPage,
    handleGetAllPages,
    fetchDefaultPage,
    allPages,
    setcurrentPage,
  };
};

export default usePageHook;
