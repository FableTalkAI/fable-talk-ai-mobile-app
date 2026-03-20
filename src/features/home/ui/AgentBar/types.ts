import { StyleProp, ViewStyle } from 'react-native';

import { Tag } from '@/features/agents/store/agents/types.ts';
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
  tags: Tag[];
  avatarSource: AutoImageSource;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  mode?: AgentBarModes;
};
