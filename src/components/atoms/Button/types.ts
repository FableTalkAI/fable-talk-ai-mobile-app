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
  containerStyle?: StyleProp<ViewStyle>;
} & UniquePressableProps;

export enum ButtonModes {
  Primary = 'primary',
  Disabled = 'disabled',
  Transparent = 'transparent',
  Light = 'light',
  Success = 'success',
  Reject = 'reject',
  Link = 'link',
}

export enum ButtonRadius {
  Small = 'small',
  Medium = 'medium',
}

export type ButtonModesObject = {
  backgroundColor: string;
  color: string;
};
