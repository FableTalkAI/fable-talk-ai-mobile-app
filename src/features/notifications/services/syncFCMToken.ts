import { getDeviceInfo } from '@/shared/lib/device.ts';

import { updateNotificationsToken } from './updateNotificationsToken.ts';

export const syncFCMToken = async (fcmToken: string) => {
  try {
    const deviceMetadata = await getDeviceInfo();

    const payload = {
      ...deviceMetadata,
      firebaseToken: fcmToken,
    };

    await updateNotificationsToken(payload);
  } catch (error) {
    console.error('[useNotifications] Failed to sync token:', error);
  }
};
