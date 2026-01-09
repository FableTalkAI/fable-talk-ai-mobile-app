import { Attributes, ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type ResizeIconProps = {
  icon?: ReactElement<SvgProps>;
  containerStyle?: StyleProp<ViewStyle>;
  cloneElementProps?: Partial<SvgProps> & Attributes;
};
