import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { NotificationEventType, ParsedNotification } from '../model/types';

export const parseNotification = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): ParsedNotification<NotificationEventType> | null => {
  const { data } = remoteMessage;
  if (!data?.type) return null;

  const type = data.type as NotificationEventType;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type: _, ...payload } = data;

  return {
    type,
    payload: payload as any,
  } as ParsedNotification<NotificationEventType>;
};
