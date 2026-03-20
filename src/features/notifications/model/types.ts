export enum NotificationEventType {
  NewMessage = 'new-message',
}

export type NewMessagePayload = {
  agentId: string;
};

export type NotificationPayloadMap = {
  [NotificationEventType.NewMessage]: NewMessagePayload;
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
