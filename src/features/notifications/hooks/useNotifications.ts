import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import { processRemoteMessage } from '@/features/notifications/services/processRemoteMessage.ts';
import { setupNotifications } from '@/features/notifications/services/setupNotifications.ts';
import { syncFCMToken } from '@/features/notifications/services/syncFCMToken.ts';

export const useNotifications = () => {
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) return;

    setupNotifications().catch(console.error);

    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      syncFCMToken(token).catch(console.error);
    });

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      processRemoteMessage(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      processRemoteMessage(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) processRemoteMessage(remoteMessage);
      });

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeOnMessage();
    };
  }, [isLoggedIn]);
};
