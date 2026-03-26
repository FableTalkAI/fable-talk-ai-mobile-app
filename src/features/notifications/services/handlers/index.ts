import {
  NotificationEventType,
  NotificationHandlers,
  NotificationPayloadMap,
} from '@/features/notifications/model/types.ts';

import { agentApprovedHandler } from './agentApprovedHandler.ts';
import { agentRejectedHandler } from './agentRejectedHandler.ts';

const handlers: NotificationHandlers = {
  [NotificationEventType.AgentApproved]: agentApprovedHandler,
  [NotificationEventType.AgentRejected]: agentRejectedHandler,
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
