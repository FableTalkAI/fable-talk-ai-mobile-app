import { ReactElement } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

type ExcludeTextInputCustomProps = 'style' | 'placeholderTextColor' | 'value' | 'textAlignVertical';

type UniqueTextInputCustomProps = Omit<TextInputProps, ExcludeTextInputCustomProps>;

export type TextInputCustomProps = {
  value: string;
  leftIcon?: ReactElement<SvgProps>;
  wrapperStyle?: StyleProp<ViewStyle>;
  shadowStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  withCharCount?: boolean;
} & UniqueTextInputCustomProps;
