import { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/core/constants/device.ts';
import { SPACING } from '@/core/constants/sizes.ts';

import { AutoImageProps } from './types.ts';

const AutoImage = ({
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

  const { width: originalWidth, height: originalHeight } = Image.resolveAssetSource(imageSource);

  const calculatedHeight = useMemo(() => {
    const scale = imageWidth / originalWidth;
    return originalHeight * scale;
  }, [imageWidth, originalWidth, originalHeight]);

  const computedStyles = StyleSheet.create({
    container: {
      width: imageWidth,
      height: calculatedHeight,
    },
  });

  return (
    <Image source={imageSource} style={[computedStyles.container, style]} resizeMode={resizeMode} {...imageProps} />
  );
};

export default AutoImage;
