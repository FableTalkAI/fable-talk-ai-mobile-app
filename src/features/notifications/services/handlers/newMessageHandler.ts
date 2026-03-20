import { NewMessagePayload } from '@/features/notifications/model/types.ts';

export const newMessageHandler = (payload: NewMessagePayload) => {
  console.log('Обработка нового сообщения:', payload.agentId);
};
