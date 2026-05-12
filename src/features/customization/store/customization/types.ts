export type CustomizationState = {
  userAvatarFrame: string | null;
  avatarFrames: AvatarFrames | null;
  chatBackground?: string;
  loading: {
    avatarFrames: boolean;
  };
};

export type AvatarFrames = {
  uris: string[];
};
