import { StyleProp, TextStyle } from 'react-native';

export type TextCustomProps = {
  text: string;
  mode?: TextModes;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

export type TextModes = 'base' | 'title' | 'subtitle' | 'secondary' | 'caption' | 'extra-small' | 'tag' | 'xxl';
