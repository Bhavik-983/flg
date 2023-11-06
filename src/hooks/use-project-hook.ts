import { useAppSelector } from 'src/store/hooks';
import { ProjectType, currentProjects } from 'src/store/slices/projectSlice';

const useProjectHook = () => {
    const currentProject: ProjectType = useAppSelector(currentProjects);

    return {
        currentProject,
    };
};

export default useProjectHook;
