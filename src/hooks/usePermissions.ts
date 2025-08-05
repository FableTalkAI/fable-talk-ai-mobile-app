import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, PermissionStatus, request, RESULTS } from 'react-native-permissions';

import { IS_ANDROID, IS_IOS } from '@/core/constants/device.ts';

export const usePermissions = () => {
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

    if (status === 'blocked') {
      Alert.alert('Разрешение заблокировано', 'Чтобы использовать эту функцию, включите доступ к фото в настройках.', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Открыть настройки', onPress: openAppSettings },
      ]);
      return false;
    }

    return false;
  }, [requestGalleryPermission, openAppSettings]);

  return { handleAccessGallery };
};
