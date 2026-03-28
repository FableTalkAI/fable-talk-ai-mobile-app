import { handleNotificationEvent } from './handlers';
import { parseNotification } from './parseNotification.ts';

export const processRemoteMessage = (remoteMessage: any) => {
  const parsed = parseNotification(remoteMessage);
  if (parsed) handleNotificationEvent(parsed.type, parsed.payload);
};
