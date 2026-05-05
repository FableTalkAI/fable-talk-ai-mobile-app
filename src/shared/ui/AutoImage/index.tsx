import FastImage from '@d11/react-native-fast-image';
import { memo, useMemo } from 'react';
import { Image } from 'react-native';

import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { SPACING } from '@/shared/model/sizes.ts';

import { AutoImageProps } from './types.ts';

const AutoImage = memo(
  ({
    source,
    width,
    paddingHorizontal = 0,
    style,
    withSafeAreaInsets = true,
    resizeMode = 'contain',
    ...imageProps
  }: AutoImageProps) => {
    const localPaddingHorizontal = paddingHorizontal + (withSafeAreaInsets ? SPACING.xl * 2 : 0);

    const imageWidth = width ?? WINDOW_WIDTH - localPaddingHorizontal;

    const imageSource = typeof source === 'string' ? { uri: source } : source;

    const resolved = Image.resolveAssetSource(imageSource);

    const originalWidth = resolved?.width ?? 1;
    const originalHeight = resolved?.height ?? 1;

    const calculatedHeight = useMemo(() => {
      const scale = imageWidth / originalWidth;
      return originalHeight * scale;
    }, [imageWidth, originalWidth, originalHeight]);

    const containerStyle = useMemo(
      () => ({
        width: imageWidth,
        height: calculatedHeight,
      }),
      [imageWidth, calculatedHeight],
    );

    return (
      <FastImage
        {...imageProps}
        source={
          typeof imageSource === 'object' && 'uri' in imageSource
            ? {
                uri: imageSource.uri,
                cache: FastImage.cacheControl.immutable,
                priority: FastImage.priority.normal,
              }
            : imageSource
        }
        style={[containerStyle, style]}
        resizeMode={FastImage.resizeMode[resizeMode]}
      />
    );
  },
);

export default AutoImage;
