import FastImage, { FastImageProps } from '@d11/react-native-fast-image';
import { ComponentProps } from 'react';

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
