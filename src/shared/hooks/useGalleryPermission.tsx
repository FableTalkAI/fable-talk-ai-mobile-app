import { useCallback } from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import { IS_ANDROID, IS_IOS } from '@/shared/model/device.ts';
import PermissionDeniedBottomWindow from '@/shared/ui/PermissionDeniedBottomWindow';

export const useGalleryPermission = () => {
  const { open } = useBottomWindow();

  const openPermissionDeniedBottomWindow = useCallback(() => {
    open(close => <PermissionDeniedBottomWindow close={close} />);
  }, [open]);

  const requestGalleryPermission = useCallback(async (): Promise<boolean> => {
    let permission;

    if (IS_ANDROID) {
      permission =
        Number(Platform.Version) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    } else if (IS_IOS) {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      return false;
    }

    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.BLOCKED) {
      openPermissionDeniedBottomWindow();
      return false;
    }

    const result = await request(permission);

    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return true;
    }

    if (result === RESULTS.BLOCKED) {
      openPermissionDeniedBottomWindow();
    }

    return false;
  }, [openPermissionDeniedBottomWindow]);

  return { requestGalleryPermission };
};
