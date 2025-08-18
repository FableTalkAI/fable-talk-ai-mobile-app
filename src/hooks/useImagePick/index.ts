import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, openSettings, PERMISSIONS, PermissionStatus, request, RESULTS } from 'react-native-permissions';

import { IS_ANDROID, IS_IOS } from '@/core/constants/device.ts';

import { UseImagePickProps } from './types.ts';

export const useImagePick = ({ setAvatarUri }: UseImagePickProps) => {
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

  const openAppSettings = useCallback(() => {
    openSettings().catch(() => {
      console.warn('Cannot open settings');
    });
  }, []);

  const handleAccessGallery = useCallback(async (): Promise<boolean> => {
    const status = await requestGalleryPermission();

    if (status === 'granted' || status === 'limited') {
      return true;
    }

    // 'TODO: translation and bottomWindow instead of Alert '
    if (status === 'blocked') {
      Alert.alert('Разрешение заблокировано', 'Чтобы использовать эту функцию, включите доступ к фото в настройках.', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Открыть настройки', onPress: openAppSettings },
      ]);
      return false;
    }

    return false;
  }, [requestGalleryPermission, openAppSettings]);

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
      if (uri) {
        setAvatarUri?.(uri);
      }
    } catch (error) {
      console.warn('ImagePicker failed: ', error);
    }
  };

  return { pickImage };
};
