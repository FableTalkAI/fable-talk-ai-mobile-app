import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

import { NetworkStatus } from './types.ts';

const useNetworkStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>(NetworkStatus.Initial);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const hasInternet = state.isConnected && state.isInternetReachable !== false;
      setStatus(hasInternet ? NetworkStatus.Connected : NetworkStatus.Disconnected);
    });

    return () => unsubscribe();
  }, []);

  return { networkStatus: status };
};

export default useNetworkStatus;
