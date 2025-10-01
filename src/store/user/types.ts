import { Agent } from '@/store/agents/types.ts';

export type UserState = {
  tags: string[];
  onboardingStep: number;
  isOnboardingDone: boolean;
  profile: UserProfile;
  theme: Theme;
  notifications: {
    push: boolean;
    email: boolean;
  };
  chats: Chat[];
};

export type UserProfile = {
  avatarUri?: string;
  name?: string;
  dateOfBirth?: string;
  email?: string;
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
