import { useState } from "react";

import { useAppSelector } from "src/store/hooks";
import { KeyType, selectKeys } from "src/store/slices/keySlice";

const useKeyHook = () => {
    const allKeys: KeyType[] = useAppSelector(selectKeys);
    const [data, setData] = useState<KeyType[]>(allKeys);


    return { allKeys, data, setData };
};

export default useKeyHook;
