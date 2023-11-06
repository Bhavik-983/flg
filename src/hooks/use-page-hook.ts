import { useAppSelector } from "src/store/hooks";
import { selectCurrentPage } from "src/store/slices/pageSlice";

const usePageHook = () => {
    const currentPage = useAppSelector(selectCurrentPage);

    return { currentPage };
};

export default usePageHook;
