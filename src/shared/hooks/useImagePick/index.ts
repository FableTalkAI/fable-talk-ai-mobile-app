import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { launchImageLibrary } from 'react-native-image-picker';

import { showToast } from '@/features/overlay/services/showToast.ts';
import { useGalleryPermission } from '@/shared/hooks/useGalleryPermission.tsx';

import { MAX_IMAGE_SIZE_MB } from './constants.ts';
import { UseImagePickProps } from './types.ts';

export const useImagePick = (props?: UseImagePickProps) => {
  const { onSuccess } = props || {};
  const { t } = useTranslation();

  const { requestGalleryPermission } = useGalleryPermission();

  const pickImage = useCallback(async (): Promise<string | undefined> => {
    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) return;

    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        includeExtra: true,
        maxWidth: 2500,
        maxHeight: 2500,
        quality: 0.9,
      });

      if (response.didCancel || response.errorCode) {
        if (response.errorCode) console.warn('ImagePicker Error:', response.errorMessage);
        return;
      }

      const asset = response.assets?.[0];
      const uri = asset?.uri;
      const fileSize = asset?.fileSize;

      if (fileSize && fileSize >= MAX_IMAGE_SIZE_MB) {
        showToast({
          type: 'error',
          text2: t('image.pickerSizeError'),
        });

        return;
      }

      if (uri) {
        await onSuccess?.(uri);
        return uri;
      }
    } catch (error) {
      console.error('ImagePicker failed:', error);
    }

    return undefined;
  }, [requestGalleryPermission, t, onSuccess]);

  return { pickImage };
};
