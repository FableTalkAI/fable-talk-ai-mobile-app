import { UserProfile } from '@/store/user/types.ts';

export type UserInfoBarProps = {
  field: UserInfoBarField;
};

export type UserInfoBarField = Exclude<keyof UserProfile, 'avatarUri'>;
