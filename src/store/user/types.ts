export type UserState = {
  tags: string[];
  onboardingStep: number;
  profile: UserProfile;
  theme: Theme;
};

export type UserProfile = {
  avatarUri?: string;
  name?: string;
  dateOfBirth?: string;
  email?: string;
};

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}
