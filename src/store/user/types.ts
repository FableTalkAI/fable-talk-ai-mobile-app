export type UserState = {
  tags: string[];
  onboardingStep: number;
  profile: UserProfile;
};

export type UserProfile = {
  avatarUri?: string;
  name?: string;
  dateOfBirth?: string;
  email?: string;
};
