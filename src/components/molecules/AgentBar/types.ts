import { StyleProp, ViewStyle } from 'react-native';

import { AutoImageSource } from '@/components/atoms/AutoImage/types.ts';

export type AgentBarProps = {
  name: string;
  description: string;
  tags: string[];
  avatarSource: AutoImageSource;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};
