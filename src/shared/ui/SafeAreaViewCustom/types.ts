import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export type SafeAreaViewCustomProps = {
  children: ReactNode;
  isTransparent?: boolean;
  withGradientBackground?: boolean;
  withHorizontalPadding?: boolean;
  withBottomPadding?: boolean;
  style?: StyleProp<ViewStyle>;
} & Omit<SafeAreaViewProps, 'style'>;
