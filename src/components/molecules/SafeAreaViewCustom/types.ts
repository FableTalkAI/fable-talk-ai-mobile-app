import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type SafeAreaViewCustomProps = {
  children: ReactNode;
  isTransparent?: boolean;
  style?: StyleProp<ViewStyle>;
};
