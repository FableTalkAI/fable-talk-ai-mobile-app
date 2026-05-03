export type ProfileState = {
  profile: User | null;
  limits: UserLimits | null;
  loading: {
    contactUs: boolean;
    uploadAvatar: boolean;
    updateProfile: boolean;
    deleteUserProfile: boolean;
  };
};

export type MessageKey = {
  messageKey: string;
};

export type User = {
  avatarUrl: string;
  chats: {
    agentId: string;
    chatId: string;
  }[];
  dateOfBirth: string;
  email: string;
  name: string;
  isEmailNotificationEnabled: boolean;
  isOnboardingDone: boolean;
  isCreatedAgent: boolean;
};

export type UserLimits = {
  count: number;
  lastResetDay: string;
  limit: number;
};

export type UpdateUserProfileRequest = {
  user: Partial<User>;
  showToast?: boolean;
};
