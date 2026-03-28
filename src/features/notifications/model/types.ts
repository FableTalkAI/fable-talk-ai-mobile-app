export enum NotificationEventType {
  AgentApproved = 'AgentApproved',
  AgentRejected = 'AgentRejected',
}

export type AgentModerationPayload = {
  agentId: string;
};

export type NotificationPayloadMap = {
  [NotificationEventType.AgentApproved]: AgentModerationPayload;
  [NotificationEventType.AgentRejected]: AgentModerationPayload;
};

export type ParsedNotification<T extends NotificationEventType> = {
  type: T;
  payload: NotificationPayloadMap[T];
};

export type NotificationHandlers = {
  [K in NotificationEventType]: (payload: NotificationPayloadMap[K]) => void | Promise<void>;
};

export type UpdateNotificationsTokenRequest = {
  firebaseToken: string;
  deviceId: string;
  deviceName: string;
};
