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

  const { currentProject } = useProjectHook();
  const defaultLanguages: DefaultLanguage[] = useAppSelector(selectDefaultLanguagesData);
  const allLanguages: Language[] = useAppSelector(selectAllLanguagesData);
  const projectLanguage: NewLanguage[] = useAppSelector(selectProjectLanguage);
  console.log(allLanguages);
  const [languages, setLanguages] = useState<DefaultLanguage[]>(defaultLanguages);

  // const projectLanguage = allLanguages
  //   ? allLanguages.filter((language: Language) => language.projectID === currentProject._id)
  //   : [];
  // console.log()

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
    try {
      const response = await languageService.getLanguages(project_id);
      const language = response?.data?.rows || [];
      dispatch(projectLanguages(language));
      console.log(response);
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
      console.log(response);
      const newLanguage = {
        projectID: currentProject._id,
        name: response?.data?.name,
        code: response?.data?.code,
        // key: response?.data?.key,
      };
      dispatch(addProjectLanguage(newLanguage));
      onClose?.();
      handleGetLanguages(currentProject?._id);
      return response;
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.response?.data?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    }
  };

  const handleEditLanguage = (data: DefaultLanguage, id: string, onClose?: any) => {
    const language = {
      id,
      name: data.name,
      code: data.code,
      // key: data.key,
    };
    console.log(language);
    dispatch(editProjectLanguage(language));
    onClose?.();
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
  };
};

export default useLanguageHook;
