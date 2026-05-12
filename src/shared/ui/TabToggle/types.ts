import { ReactElement, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type TabToggleProps = {
  tabs: {
    name: string;
    content: ReactNode;
    icon?: ReactElement<SvgProps>;
  }[];
  activeTab: number;
  onChange: (index: number) => void;
  tabContainerWidth?: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  contentPosition?: 'top' | 'bottom';
};
