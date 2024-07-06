import { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";

export default function useNetwork() {
    ///// Init Variable
    const [netStatus, setNetStatus] = useState('');
    const [netType, setNetType] = useState('');

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setNetStatus(netStatus => state.isConnected);
            setNetType(netType => state.type);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return { netStatus, netType };
}