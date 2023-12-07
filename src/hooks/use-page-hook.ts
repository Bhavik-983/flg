/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import { useState } from 'react';

import pageService from 'src/services/pageServices';

import useProjectHook from './use-project-hook';

const usePageHook = () => {
  const { currentProject } = useProjectHook();

  const [allPages, setAllPages] = useState<LabelValue[]>([]);
  const [currentPage, setcurrentPage] = useState<LabelValue>({
    label: '',
    value: '',
  });

  const handleCreatePage = async (pageName: string, projectID: string) => {
    try {
      const response = await pageService.addPage({ name: pageName }, projectID);
      handleGetAllPages(currentProject?._id, response?.name);
      return response;
    } catch (error) {
      console.log(error);
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
