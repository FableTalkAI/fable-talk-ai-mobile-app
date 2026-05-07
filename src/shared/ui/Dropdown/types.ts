import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

export type DropdownProps = {
  data: {
    title: string;
    onPress: () => void;
    icon?: ReactElement<SvgProps>;
  }[];
  width?: number;
};
