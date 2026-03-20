import { ComponentProps } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

export type AutoImageResizeMode = keyof typeof FastImage.resizeMode;

export type AutoImageSource = string | number | { uri: string };

export type AutoImageProps = {
  source: AutoImageSource;
  width?: number;
  paddingHorizontal?: number;
  style?: FastImageProps['style'];
  withSafeAreaInsets?: boolean;
  resizeMode?: AutoImageResizeMode;
} & Omit<ComponentProps<typeof FastImage>, 'source' | 'style' | 'resizeMode'>;
