import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import { PressableProps } from 'react-native-gesture-handler';
import { PressableEvent } from 'react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps';

type ExcludePressableCustomProps = 'style' | 'onPressIn' | 'onPressOut';

type UniquePressableProps = Omit<PressableProps, ExcludePressableCustomProps>;

export type PressableCustomProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPressIn?: ((event: PressableEvent) => void) | null;
  onPressOut?: ((event: PressableEvent) => void) | null;
} & UniquePressableProps;
