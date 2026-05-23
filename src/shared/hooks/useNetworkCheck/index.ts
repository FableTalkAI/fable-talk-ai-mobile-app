import NetInfo from '@react-native-community/netinfo';
import { useEffect, useRef, useState } from 'react';

import { navigate } from '@/features/navigation/lib/navigationRef.ts';

import { NetworkStatus } from './types.ts';

export const useNetworkCheck = () => {
  const wasDisconnected = useRef(false);

  const [status, setStatus] = useState<NetworkStatus>(NetworkStatus.Initial);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const hasInternet = state.isConnected && state.isInternetReachable !== false;

      setStatus(hasInternet ? NetworkStatus.Connected : NetworkStatus.Disconnected);

      if (!hasInternet) {
        wasDisconnected.current = true;
        navigate('NoNetworkConnection', undefined, 'replace');
      } else if (hasInternet && wasDisconnected.current) {
        wasDisconnected.current = false;
        setRetryTrigger(prev => prev + 1);
      }
    });

    return () => unsubscribe();
  }, []);

  return { status, retryTrigger };
};
