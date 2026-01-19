export type ProfileState = {
  profile: User | null;
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
  isEmailNotificationEnabled: boolean;
  name: string;
  isOnboardingDone: boolean;
};

export type UpdateUserProfileRequest = {
  user: Partial<User>;
  showToast?: boolean;
};
