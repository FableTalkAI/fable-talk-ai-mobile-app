import { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '@/core/constants/device.ts';
import { AutoImageProps } from '@/components/atoms/AutoImage/types.ts';

const AutoImage = ({
  source,
  width,
  paddingHorizontal = 0,
  style,
  resizeMode = 'contain',
  ...imageProps
}: AutoImageProps) => {
  const imageWidth = width ?? WINDOW_WIDTH - paddingHorizontal;
  const { width: originalWidth, height: originalHeight } = Image.resolveAssetSource(source);

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

  return <Image source={source} style={[computedStyles.container, style]} resizeMode={resizeMode} {...imageProps} />;
};

export default AutoImage;
