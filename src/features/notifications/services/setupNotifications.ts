import messaging from '@react-native-firebase/messaging';

import { IS_IOS } from '@/shared/model/device.ts';

import { syncFCMToken } from './syncFCMToken.ts';

export const setupNotifications = async () => {
  if (IS_IOS) {
    const isRegistered = messaging().isDeviceRegisteredForRemoteMessages;
    if (!isRegistered) {
      await messaging().registerDeviceForRemoteMessages();
    }
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    try {
      const token = await messaging().getToken();
      if (token) {
        await syncFCMToken(token);
      }
    } catch (error) {
      console.error('[Notifications] Failed to get FCM token:', error);
    }
  }
};
