import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

type ReturnType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openAddLanguage: () => void;
    closeAddLanguage: () => void;
};

export default function useLanguage(): ReturnType {
    const [open, setOpen] = useState<boolean>(false);

    const openAddLanguage = useCallback(() => {
        setOpen(true);
    }, []);

    const closeAddLanguage = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        open,
        setOpen,
        openAddLanguage,
        closeAddLanguage,
    };
}
