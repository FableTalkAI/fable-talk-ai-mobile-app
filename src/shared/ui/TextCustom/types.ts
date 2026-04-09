import { ColorValue, TextProps } from 'react-native';

export type TextCustomProps = {
  text: string | number;
  mode?: TextModes;
  textColor?: ColorValue;
} & TextProps;

export enum TextModes {
  Base = 'base',
  Title = 'title',
  Subtitle = 'subtitle',
  Secondary = 'secondary',
  Caption = 'caption',
  'ExtraSmall' = 'extra-small',
  Tag = 'tag',
  Xxl = 'xxl',
  Xl = 'xl',
}
