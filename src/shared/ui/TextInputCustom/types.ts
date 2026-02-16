import { ReactElement } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

type ExcludeTextInputCustomProps = 'style' | 'placeholderTextColor' | 'textAlignVertical';

type UniqueTextInputCustomProps = Omit<TextInputProps, ExcludeTextInputCustomProps>;

export type TextInputCustomProps = {
  leftIcon?: ReactElement<SvgProps>;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  withCharCount?: boolean;
  borderRadius?: number;
} & UniqueTextInputCustomProps;
