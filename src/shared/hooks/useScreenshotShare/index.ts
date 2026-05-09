import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';

import { ScreenshotOptions } from './types.ts';

export const useScreenshotShare = () => {
  const viewRef = useRef(null);
  const { t } = useTranslation();

  const captureAndShare = useCallback(
    async (options?: ScreenshotOptions) => {
      try {
        if (!viewRef.current) return;

        const uri = await captureRef(viewRef, {
          format: options?.format || 'png',
          quality: options?.quality || 0.9,
          result: 'tmpfile',
        });

        const appLink = `https://fabletalkai.work/dl${options?.path}`;
        const message = `${options?.message || 'FableTalkAI'}\n${appLink}`;

        const shareOptions = {
          message,
          url: uri,
          type: `image/${options?.format || 'png'}`,
          failOnCancel: false,
          subject: t('share.subject'),
        };

        return await Share.open(shareOptions);
      } catch (error) {
        console.error(error);
      }
    },
    [t],
  );

  return {
    viewRef,
    captureAndShare,
  };
};
