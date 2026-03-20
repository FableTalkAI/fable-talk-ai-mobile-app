import { Attributes, ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export enum EmptyStubSizes {
  Default = 'default',
  Small = 'small',
}

export type EmptyStubProps = {
  icon: ReactElement<SvgProps>;
  title: string;
  subtitle: string;
  style?: StyleProp<ViewStyle>;
  size?: EmptyStubSizes;
  cloneElementProps?: Partial<SvgProps> & Attributes;
};
