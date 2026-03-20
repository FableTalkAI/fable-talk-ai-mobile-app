import {
  NotificationEventType,
  NotificationHandlers,
  NotificationPayloadMap,
} from '@/features/notifications/model/types.ts';

import { newMessageHandler } from './newMessageHandler.ts';

const handlers: NotificationHandlers = {
  [NotificationEventType.NewMessage]: newMessageHandler,
};

export const handleNotificationEvent = <T extends NotificationEventType>(
  type: T,
  payload: NotificationPayloadMap[T],
) => {
  const handler = handlers[type];
  if (handler) {
    handler(payload);
  } else {
    console.warn(`No handler for: ${type}`);
  }
};
