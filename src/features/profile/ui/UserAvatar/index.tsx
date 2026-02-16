import { BACKEND_BASE_URL } from '@env';

import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { useUserAvatarPick } from '@/features/profile/hooks/useUserAvatarPick.ts';
import Avatar from '@/shared/ui/Avatar';

import { UserAvatarProps } from './types.ts';

const UserAvatar = ({ size = 144, isChangeable = true, style }: UserAvatarProps) => {
  const { profile, isLoading } = useProfileStore();

  const { pickImage } = useUserAvatarPick();

  const getAvatarUrl = () => {
    if (!profile) return '';
    if (profile.avatarUrl.startsWith('http')) return profile.avatarUrl;
    return BACKEND_BASE_URL + profile.avatarUrl;
  };

  return (
    <Avatar
      isLoading={isLoading.uploadAvatar}
      uri={profile && profile.avatarUrl ? getAvatarUrl() : ''}
      onPickImage={pickImage}
      isChangeable={isChangeable}
      style={style}
      size={size}
    />
  );
};

export default UserAvatar;
