import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export type ShadowCustomProps = {
  mode?: ShadowCustomModes;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export type ShadowCustomModes = 'none' | 'base' | 'medium' | 'alt';
