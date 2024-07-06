import { useEffect, useState } from 'react';
import { storeKeyConfig, getData, getDataObject } from '@utils/storage';

export default function useGetStorage(isFocused) {
    ///// Init Variable
    const [data, setData] = useState('');

    useEffect(() => {
        const getStorageData = async() => {
            const remenberInfo = await getDataObject(storeKeyConfig.REMEMBER_INFO);
            setData(data => remenberInfo);
        }

        getStorageData();
        
    }, [isFocused]);

    return { data };
}