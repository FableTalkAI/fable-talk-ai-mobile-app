import { UserProfile } from '@/store/user/types.ts';

export type UserInfoBarProps = {
  title: string;
  field: keyof UserProfile;
};
