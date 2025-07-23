import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ShadowCustomProps = {
  mode?: ShadowCustomModes;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export type ShadowCustomModes = 'none' | 'base' | 'medium' | 'alt';
