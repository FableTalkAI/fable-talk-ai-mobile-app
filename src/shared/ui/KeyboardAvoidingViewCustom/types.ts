import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type KeyboardAvoidingViewCustomProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollContentStyle?: StyleProp<ViewStyle>;
};

export type Options = {
  behavior?: 'padding' | 'height' | 'position';
  keyboardVerticalOffset?: number;
};
