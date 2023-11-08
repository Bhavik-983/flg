import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  Language,
  DefaultLanguage,
  addProjectLanguage,
  editProjectLanguage,
  selectAllLanguagesData,
  selectDefaultLanguagesData,
} from 'src/store/slices/LanguageSlice';

import useProjectHook from './use-project-hook';

const useLanguageHook = () => {
  const dispatch = useAppDispatch();

  const { currentProject } = useProjectHook();
  const defaultLanguages: DefaultLanguage[] = useAppSelector(selectDefaultLanguagesData);
  const allLanguages: Language[] = useAppSelector(selectAllLanguagesData);

  const [languages, setLanguages] = useState<DefaultLanguage[]>(defaultLanguages);

  const projectLanguages = allLanguages
    ? allLanguages.filter((language: Language) => language.projectID === currentProject.projectID)
    : [];

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

  const handleAddLanguage = (data: DefaultLanguage, onClose?: any) => {
    const newLanguage: Language = {
      id: uuidv4(),
      projectID: currentProject.projectID,
      name: data.name,
      code: data.code,
      nativeName: data.nativeName,
    };
    dispatch(addProjectLanguage(newLanguage));
    onClose?.();
  };

  const handleEditLanguage = (data: DefaultLanguage, id: string, onClose?: any) => {
    const language = {
      id,
      name: data.name,
      code: data.code,
      nativeName: data.nativeName,
    };

    dispatch(editProjectLanguage(language));
    onClose?.();
  };

  return {
    defaultLanguages,
    allLanguages,
    projectLanguages,
    languages,
    handleSearch,
    resetLanguages,
    handleAddLanguage,
    handleEditLanguage,
  };
};

export default useLanguageHook;
  