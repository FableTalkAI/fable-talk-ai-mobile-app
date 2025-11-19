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
