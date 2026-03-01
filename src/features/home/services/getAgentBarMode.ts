import { AgentModerationStatus } from '@/features/agents/store/agents/types.ts';
import { AgentBarModes } from '@/features/home/ui/AgentBar/types.ts';

export type GetAgentBarModeParams = {
  isPremium: boolean;
  moderationStatus: AgentModerationStatus;
};

export const getAgentBarMode = ({ isPremium, moderationStatus }: GetAgentBarModeParams) => {
  if (moderationStatus === AgentModerationStatus.OnModeration) return AgentBarModes.OnModeration;
  if (moderationStatus === AgentModerationStatus.Rejected) return AgentBarModes.Rejected;
  if (isPremium) return AgentBarModes.Premium;
  return AgentBarModes.Default;
};
