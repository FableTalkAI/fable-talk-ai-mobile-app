import { Agent } from '@/store/agents/types.ts';

export type UserState = {
  onboardingStep: number;
  filter: {
    tags: string[];
    sortBy: SortByFilter;
    sort: SortFilter;
  };
  theme: Theme;
  notifications: {
    push: boolean;
  };
  chats: Chat[];
};

export enum SortByFilter {
  Alphabetically = 'alphabetically',
  Popularity = 'popularity',
  DateAdded = 'dateAdded',
}

export enum SortFilter {
  ASC = 'asc',
  DESC = 'desc',
}

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
