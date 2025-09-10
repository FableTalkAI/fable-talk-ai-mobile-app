import { ColorValue, StyleProp, TextStyle } from 'react-native';

export type TextCustomProps = {
  text: string;
  mode?: TextModes;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  textColor?: ColorValue;
};

export enum TextModes {
  Base = 'base',
  Title = 'title',
  Subtitle = 'subtitle',
  Secondary = 'secondary',
  Caption = 'caption',
  'ExtraSmall' = 'extra-small',
  Tag = 'tag',
  Xxl = 'xxl',
}
