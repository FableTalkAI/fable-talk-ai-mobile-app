import { ReactNode } from 'react';
import { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';

type ExcludePressableCustomProps = 'style' | 'onPressIn' | 'onPressOut';

type UniquePressableProps = Omit<PressableProps, ExcludePressableCustomProps>;

export type PressableCustomProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  withEnteringAnimation?: boolean;
  withExitingAnimation?: boolean;
  onPressIn?: ((event: GestureResponderEvent) => void) | null;
  onPressOut?: ((event: GestureResponderEvent) => void) | null;
} & UniquePressableProps;
