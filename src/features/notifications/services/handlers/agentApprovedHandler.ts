import { AgentModerationPayload } from '@/features/notifications/model/types.ts';

export const agentApprovedHandler = (payload: AgentModerationPayload) => {
  console.log('Обработка нового сообщения:', payload.agentId);
};
