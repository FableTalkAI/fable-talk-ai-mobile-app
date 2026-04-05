import { StyleProp, ViewStyle } from 'react-native';

import { PressableCustomProps } from '@/shared/ui/PressableCustom/types.ts';

type ExcludePressableProps = 'style';

type UniquePressableProps = Omit<PressableCustomProps, ExcludePressableProps>;

export type ButtonProps = {
  title: string;
  mode?: ButtonModes;
  radius?: ButtonRadius;
  isLoading?: boolean;
  isDisable?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  numberOfLines?: number;
} & UniquePressableProps;

export enum ButtonModes {
  Primary = 'primary',
  Disabled = 'disabled',
  Transparent = 'transparent',
  Light = 'light',
  Success = 'success',
  Reject = 'reject',
  Link = 'link',
  Ghost = 'ghost',
}

export enum ButtonRadius {
  Small = 'small',
  Medium = 'medium',
}

export type ButtonModesObject = {
  backgroundColor: string;
  color: string;
};
