/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import languageService, { AddLanguageTypes } from 'src/services/languageServices';
import {
  Language,
  NewLanguage,
  DefaultLanguage,
  projectLanguages,
  addProjectLanguage,
  editProjectLanguage,
  selectProjectLanguage,
  selectAllLanguagesData,
  selectDefaultLanguagesData,
} from 'src/store/slices/LanguageSlice';

import useProjectHook from './use-project-hook';

const useLanguageHook = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const { currentProject } = useProjectHook();
  const defaultLanguages: DefaultLanguage[] = useAppSelector(selectDefaultLanguagesData);
  const allLanguages: Language[] = useAppSelector(selectAllLanguagesData);
  const projectLanguage: NewLanguage[] = useAppSelector(selectProjectLanguage);
  const [languages, setLanguages] = useState<DefaultLanguage[]>(defaultLanguages);

  const handleSearch = (language: string) => {
    const updatedData =
      defaultLanguages &&
      defaultLanguages.filter((data: DefaultLanguage) => {
        if (data.name.toLowerCase().includes(language.toLowerCase())) {
          return data;
        }
        return undefined;
      });
    setLanguages(updatedData);
  };

  const resetLanguages = () => {
    setLanguages(defaultLanguages);
  };

  const handleGetLanguages = async (project_id: string) => {
    setIsLoading(true);
    try {
      const response = await languageService.getLanguages(project_id);
      const language = response?.data?.languages || [];
      dispatch(projectLanguages(language));
      setIsLoading(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddLanguage = async (
    AddLanguageData: AddLanguageTypes,
    projectID: string,
    onClose?: any
  ) => {
    try {
      const response = await languageService.addLanguage(AddLanguageData, projectID);
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      const newLanguage = {
        projectID: currentProject._id,
        name: response?.data?.name,
        code: response?.data?.code,
      };
      dispatch(addProjectLanguage(newLanguage));
      onClose?.();
      handleGetLanguages(currentProject?._id);
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      onClose?.();
    }
  };

  const handleEditLanguage = async (
    data: AddLanguageTypes,
    languageid: string,
    projectid: string,
    onClose?: any
  ) => {
    try {
      const response = await languageService.editLanguage(data, languageid, projectid);
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      const newLanguage: any = {
        languageid,
        projectID: currentProject?._id,
        name: response?.data?.name,
        code: response?.data?.code,
      };
      dispatch(editProjectLanguage(newLanguage));
      handleGetLanguages(currentProject?._id);
      onClose?.();
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
      onClose?.();
    }
  };

  const handleDownloadData = async (projectId: string, languageId: string) => {
    try {
      const response = await languageService.jsondownload(projectId, languageId);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    defaultLanguages,
    allLanguages,
    projectLanguage,
    languages,
    handleSearch,
    resetLanguages,
    handleAddLanguage,
    handleEditLanguage,
    handleGetLanguages,
    handleDownloadData,
    isLoading,
  };
};

export default useLanguageHook;
