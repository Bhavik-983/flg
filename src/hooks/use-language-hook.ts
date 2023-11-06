import React, { useState } from 'react';
import useProjectHook from './use-project-hook';
import { useAppSelector } from 'src/store/hooks';
import { Language, ProjectLanguage, selectLanguageData, selectProjectLanguage } from 'src/store/slices/LanguageSlice';

const useLanguageHook = () => {

    const { currentProject } = useProjectHook()
    const allLanguages = useAppSelector(selectLanguageData);
    const projectLanguage = useAppSelector(selectProjectLanguage);
    const [languageData, setLanguageData] = useState<Language[]>(allLanguages);

    const languages: ProjectLanguage[] = useAppSelector(selectProjectLanguage);
    const [selectedID, setSelectedId] = useState<string | undefined>('');
    const projLanguage = languages.filter(
        (data: ProjectLanguage) => data.projectID === currentProject.projectID
    );

    return { languageData, setLanguageData, languages, selectedID, setSelectedId, projLanguage, allLanguages, projectLanguage };
};

export default useLanguageHook;
