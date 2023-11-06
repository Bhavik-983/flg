import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

type ReturnType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openAddProjectModal: () => void;
    closeAddProjectModal: () => void;
};

export default function useProjectModal(): ReturnType {
    const [open, setOpen] = useState<boolean>(false);

    const openAddProjectModal = useCallback(() => {
        setOpen(true);
    }, []);

    const closeAddProjectModal = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        open,
        setOpen,
        openAddProjectModal,
        closeAddProjectModal,
    };
}
