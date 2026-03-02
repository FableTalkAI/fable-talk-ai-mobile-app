import { StyleProp, ViewStyle } from 'react-native';

import { Tag } from '@/features/agents/store/agents/types.ts';

export type TagProps = {
  tag: Tag;
  forceActive?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  onToggle?: (title: Tag) => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export enum TagColorModes {
  Inactive = 'inactive',
  Active = 'active',
}
