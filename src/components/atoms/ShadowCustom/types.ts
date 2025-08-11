import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ShadowCustomProps = {
  mode?: ShadowCustomModes;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export enum ShadowCustomModes {
  None = 'none',
  Base = 'base',
  Medium = 'medium',
  Alt = 'alt',
}
