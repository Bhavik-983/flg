import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

type ReturnType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openAddPageModal: () => void;
    closeAddPageModal: () => void;
};

export default function usePage(): ReturnType {
    const [open, setOpen] = useState<boolean>(false);

    const openAddPageModal = useCallback(() => {
        setOpen(true);
    }, []);

    const closeAddPageModal = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        open,
        setOpen,
        openAddPageModal,
        closeAddPageModal,
    };
}
