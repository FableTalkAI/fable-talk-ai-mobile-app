import { AvatarFrames } from '@/features/profile/store/profile/types.ts';

export type CustomizationState = {
  userAvatarFrame: string | null;
  avatarFrames: AvatarFrames | null;
  loading: {
    avatarFrames: boolean;
  };
};
