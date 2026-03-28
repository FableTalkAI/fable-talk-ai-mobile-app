import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import { bootstrapNotifeeChannel } from '@/features/notifications/services/bootstrapNotifeeChannel.ts';
import { notifeeNotification } from '@/features/notifications/services/notifeeNotification.ts';
import { processRemoteMessage } from '@/features/notifications/services/processRemoteMessage.ts';
import { setupNotifications } from '@/features/notifications/services/setupNotifications.ts';
import { syncFCMToken } from '@/features/notifications/services/syncFCMToken.ts';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  processRemoteMessage(remoteMessage);
});

export const useNotifications = () => {
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) return;

    setupNotifications().catch(console.error);
    bootstrapNotifeeChannel().catch(console.error);

    const unsubscribeTokenRefresh = messaging().onTokenRefresh(syncFCMToken);
    const unsubscribeOnMessage = messaging().onMessage(notifeeNotification);
    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification) {
        processRemoteMessage({
          data: detail.notification.data,
          notification: detail.notification,
        });
      }
    });

    const unsubscribeFirebaseOpen = messaging().onNotificationOpenedApp(remoteMessage => {
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
      unsubscribeNotifee();
      unsubscribeFirebaseOpen();
    };
  }, [isLoggedIn]);
};
