import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';

type ExcludeTextInputCustomProps = 'style' | 'placeholder' | 'placeholderTextColor';

type UniqueTextInputCustomProps = Omit<TextInputProps, ExcludeTextInputCustomProps>;

export type TextInputCustomProps = {
  placeholder: string;
  placeholderTextColor?: string;
  shadowMode?: ShadowCustomModes;
  textMode?: TextModes;
  leftIcon?: ReactElement<SvgProps>;
  viewStyleExtra?: StyleProp<ViewStyle>;
  textStyleExtra?: StyleProp<TextStyle>;
} & UniqueTextInputCustomProps;
