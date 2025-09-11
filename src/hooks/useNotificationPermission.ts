import { useEffect } from 'react';
import { AppState } from 'react-native';
import { checkNotifications, openSettings, requestNotifications, RESULTS } from 'react-native-permissions';

import useUserStore from './useUserStore.ts';

const useNotificationPermission = () => {
  const { setPushNotificationHandler } = useUserStore();

  const authorizeHandler = async () => {
    const { status } = await checkNotifications();

    if (status === RESULTS.BLOCKED || status === RESULTS.DENIED) {
      await openSettings();
    } else {
      const { status: newStatus } = await requestNotifications();
      if (newStatus === RESULTS.GRANTED) {
        setPushNotificationHandler(true);
      }
    }
  };

  useEffect(() => {
    checkNotifications().then(({ status }) => {
      setPushNotificationHandler(status === RESULTS.GRANTED);
    });
  }, [setPushNotificationHandler]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // When coming back from settings, check permissions again
        checkNotifications().then(({ status }) => {
          setPushNotificationHandler(status === RESULTS.GRANTED);
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [setPushNotificationHandler]);

  return {
    authorizeHandler,
  };
};

export default useNotificationPermission;
