import { ReactElement } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';

type ExcludeTextInputCustomProps = 'style' | 'placeholder' | 'placeholderTextColor' | 'numberOfLines';

type UniqueTextInputCustomProps = Omit<TextInputProps, ExcludeTextInputCustomProps>;

export type TextInputCustomProps = {
  placeholder?: string;
  placeholderTextColor?: string;
  shadowMode?: ShadowCustomModes;
  leftIcon?: ReactElement<SvgProps>;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  showCharCount?: boolean;
  maxLength?: number;
} & UniqueTextInputCustomProps;
