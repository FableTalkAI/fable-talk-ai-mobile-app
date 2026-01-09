import { useCallback } from 'react';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS, PermissionStatus, request, RESULTS } from 'react-native-permissions';

import { BottomWindowModes } from '@/features/bottomWindow/hooks/useBottomWindow/types.ts';
import { IS_ANDROID, IS_IOS } from '@/shared/model/device.ts';

import useBottomWindow from '../../features/bottomWindow/hooks/useBottomWindow';
import useProfileStore from '../../features/profile/hooks/useProfileStore.ts';

export const useImagePick = () => {
  const { open } = useBottomWindow(BottomWindowModes.PermissionDenied);
  const { profile, uploadAvatarHandler } = useProfileStore();

  const requestGalleryPermission = useCallback(async (): Promise<PermissionStatus> => {
    let permission;

    if (IS_ANDROID) {
      permission =
        Number(Platform.Version) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    } else if (IS_IOS) {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      return 'denied';
    }

    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.BLOCKED) {
      return 'blocked';
    }

    const result = await request(permission);

    if (result === RESULTS.GRANTED) return 'granted';
    if (result === RESULTS.LIMITED) return 'limited';
    if (result === RESULTS.BLOCKED) return 'blocked';

    return 'denied';
  }, []);

  const handleAccessGallery = useCallback(async (): Promise<boolean> => {
    const status = await requestGalleryPermission();

    if (status === 'granted' || status === 'limited') {
      return true;
    }

    if (status === 'blocked') {
      open();
      return false;
    }

    return false;
  }, [requestGalleryPermission, open]);

  const pickImage = async () => {
    const hasPermission = await handleAccessGallery();
    if (!hasPermission) {
      console.warn('Permission to access gallery denied');
      return;
    }

    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (response.didCancel) return;
      if (response.errorCode) {
        console.warn('ImagePicker Error: ', response.errorMessage);
        return;
      }

      const uri = response.assets?.[0]?.uri;
      if (uri && profile) {
        uploadAvatarHandler(uri).catch(console.error);
      }
    } catch (error) {
      console.warn('ImagePicker failed: ', error);
    }
  };

  return { pickImage };
};
