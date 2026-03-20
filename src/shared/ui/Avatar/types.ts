import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type AvatarProps = {
  size?: number;
  isChangeable?: boolean;
  style?: StyleProp<ViewStyle>;
  onPickImage?: () => Promise<string | undefined>;
  uri?: string;
  isLoading?: boolean;
  withEnteringAnimation?: boolean;
  placeholderComponent?: ReactNode;
};
