import { ReactElement, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type TooltipProps = {
  children: ReactElement;
  content: ReactNode;
  style?: StyleProp<ViewStyle>;
};
