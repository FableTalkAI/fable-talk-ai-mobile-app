import { StyleProp, ViewStyle } from 'react-native';

import { AutoImageSource } from '@/shared/ui/AutoImage/types.ts';

export enum AgentBarModes {
  Default = 'Default',
  Premium = 'Premium',
  OnModeration = 'OnModeration',
  Rejected = 'Rejected',
}

export type AgentBarProps = {
  name: string;
  description: string;
  tagIds: string[];
  avatarSource: AutoImageSource;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  mode?: AgentBarModes;
};
