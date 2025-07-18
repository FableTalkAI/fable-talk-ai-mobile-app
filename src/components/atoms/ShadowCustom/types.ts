import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export type ShadowCustomProps = {
  mode?: ShadowCustomModes;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export type ShadowCustomModes = 'none' | 'light' | 'medium' | 'strong';
