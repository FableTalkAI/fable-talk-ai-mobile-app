import { store } from '@/app/store';
import { myAgentsSelector } from '@/features/agents/store/agents/selectors.ts';
import { getFilteredAgents, getMyAgents } from '@/features/agents/store/agents/thunks.ts';
import { AgentModerationStatus } from '@/features/agents/store/agents/types.ts';
import { navigate } from '@/features/navigation/lib/navigationRef.ts';
import { AgentModerationPayload } from '@/features/notifications/model/types.ts';

export const agentRejectedHandler = async ({ agentId }: AgentModerationPayload) => {
  const myAgents = myAgentsSelector(store.getState());
  const isNeedsUpdate = !myAgents.some(a => a.id === agentId && a.moderationStatus === AgentModerationStatus.Rejected);

  if (isNeedsUpdate) {
    await Promise.all([store.dispatch(getMyAgents(false)).unwrap(), store.dispatch(getFilteredAgents(false)).unwrap()]);
  }

  navigate('CreateAgent', { id: agentId });
};
