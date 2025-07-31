import { StyleProp, ViewStyle } from 'react-native';
import { PressableProps } from 'react-native-gesture-handler';

type ExcludePressableProps = 'style';

type UniquePressableProps = Omit<PressableProps, ExcludePressableProps>;

export type ButtonProps = {
  title: string;
  mode?: ButtonModes;
  radius?: ButtonRadius;
  isLoading?: boolean;
  isDisable?: boolean;
  style?: StyleProp<ViewStyle>;
} & UniquePressableProps;

export type ButtonModes = 'primary' | 'disabled' | 'transparent' | 'light';

export type ButtonModesObject = {
  backgroundColor: string;
  color: string;
};

type ButtonRadius = 'small' | 'medium';
