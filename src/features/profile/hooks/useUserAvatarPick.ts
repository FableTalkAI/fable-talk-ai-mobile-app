import { useImagePick } from '@/shared/hooks/useImagePick';

import useProfileStore from './useProfileStore.ts';

export const useUserAvatarPick = () => {
  const { profile, uploadAvatarHandler } = useProfileStore();

  const { pickImage } = useImagePick({
    onSuccess: uri => {
      if (uri && profile) {
        uploadAvatarHandler(uri).catch(console.error);
      }
    },
  });

  return { pickImage };
};
