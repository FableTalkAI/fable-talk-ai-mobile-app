import { AgentModerationPayload } from '@/features/notifications/model/types.ts';

export const agentRejectedHandler = (payload: AgentModerationPayload) => {
  console.log('Обработка нового сообщения:', payload.agentId);
};
