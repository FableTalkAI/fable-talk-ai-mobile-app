import { StyleProp, ViewStyle } from 'react-native';

export type TagProps = {
  title: string;
  forceActive?: boolean;
  isSelected?: boolean;
  onToggle?: (title: string) => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export enum TagColorModes {
  Inactive = 'inactive',
  Active = 'active',
}
