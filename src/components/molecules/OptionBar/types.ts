import { ReactElement, ReactNode } from 'react';
import { SvgProps } from 'react-native-svg';

export type OptionBarProps = {
  title: string;
  subtitle?: string;
  mode?: OptionBarModes;
  leftIcon?: ReactElement<SvgProps>;
  rightComponent?: ReactNode;
  colorMode?: OptionBarColorModes;
};

export enum OptionBarModes {
  Simple = 'simple',
  Complex = 'complex',
}

export enum OptionBarColorModes {
  Default = 'default',
  Red = 'red',
}
