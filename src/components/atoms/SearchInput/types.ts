import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';

type ExcludeSearchInputProps = 'style' | 'placeholder' | 'placeholderTextColor';

type UniqueSearchInputProps = Omit<TextInputProps, ExcludeSearchInputProps>;

export type SearchInputProps = {
  placeholder?: string;
  placeholderTextColor?: string;
  shadowMode?: ShadowCustomModes;
  withBackArrow?: boolean;
  withFilter?: boolean;
  shadowStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
} & UniqueSearchInputProps;
