import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { NotificationEventType, ParsedNotification } from '../model/types';

export const parseNotification = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): ParsedNotification<NotificationEventType> | null => {
  const { data } = remoteMessage;
  if (!data?.type) return null;

  const type = data.type as NotificationEventType;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type: _, ...rawPayload } = data;

  const payload = Object.keys(rawPayload).reduce((acc, key) => {
    const value = rawPayload[key];
    try {
      if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
        acc[key] = JSON.parse(value);
      } else {
        acc[key] = value;
      }
    } catch {
      acc[key] = value;
    }

    return acc;
  }, {} as any);

  return {
    type,
    payload,
  } as ParsedNotification<NotificationEventType>;
};
