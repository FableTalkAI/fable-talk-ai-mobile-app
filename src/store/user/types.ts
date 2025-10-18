import { Agent } from '@/store/agents/types.ts';

export type UserState = {
  tags: string[];
  onboardingStep: number;
  isOnboardingDone: boolean;
  theme: Theme;
  notifications: {
    push: boolean;
  };
  chats: Chat[];
};

export type Chat = {
  agentName: Agent['name'];
  agentAvatar: Agent['avatarSource'];
  lastMessage: string;
  isPinned: boolean;
};

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}
