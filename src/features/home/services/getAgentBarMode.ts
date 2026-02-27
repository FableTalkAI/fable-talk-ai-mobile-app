import { AgentBarModes } from '@/features/home/ui/AgentBar/types.ts';

export type GetAgentBarModeParams = {
  isPremium: boolean;
  onModeration: boolean;
};

export const getAgentBarMode = ({ isPremium, onModeration }: GetAgentBarModeParams) => {
  if (onModeration) return AgentBarModes.OnModeration;
  if (isPremium) return AgentBarModes.Premium;
  return AgentBarModes.Default;
};
