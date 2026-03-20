import { ReactNode } from 'react';
import { Insets, StyleProp, ViewStyle } from 'react-native';

export type KeyboardAvoidingViewCustomProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollContentStyle?: StyleProp<ViewStyle>;
};

export type Options = {
  behavior?: 'padding' | 'height' | 'position';
  contentInset?: Insets;
};
