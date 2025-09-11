export type UserState = {
  tags: string[];
  onboardingStep: number;
  profile: UserProfile;
  theme: Theme;
  notifications: {
    push: boolean;
    email: boolean;
  };
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
