import messaging from '@react-native-firebase/messaging';

import { IS_IOS } from '@/shared/model/device.ts';

import { syncFCMToken } from './syncFCMToken.ts';

export const setupNotifications = async () => {
  try {
    if (IS_IOS) {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      if (token) {
        await syncFCMToken(token);
        console.log('[Notifications] Token synced:', token);
      }
    }
  } catch (error) {
    console.error('[Notifications] Error during setup:', error);
  }
};
