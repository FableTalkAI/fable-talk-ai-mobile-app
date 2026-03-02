import { Tag } from '@/features/agents/store/agents/types.ts';

export type UserState = {
  onboardingStep: number;
  filter: {
    tags: Tag[];
    sortBy: SortByFilter;
    sort: SortFilter;
  };
  theme: Theme;
  notifications: {
    push: boolean;
  };
  pinnedChatIds: string[];
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

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}
