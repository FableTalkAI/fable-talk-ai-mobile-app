import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import { ImageProps } from 'react-native';

type ExcludeImageProps = 'style' | 'width' | 'resizeMode' | 'source';

type UniqueImageProps = Omit<ImageProps, ExcludeImageProps>;

export type AutoImageProps = {
  source: ImageSourcePropType;
  width?: number;
  paddingHorizontal?: number;
  style?: StyleProp<ImageStyle>;
  withSafeAreaInsets?: boolean;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
} & UniqueImageProps;
