import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export type AgentBarProps = {
  agentName: string;
  agentDescription: string;
  tags: string[];
  avatarSource: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
};
