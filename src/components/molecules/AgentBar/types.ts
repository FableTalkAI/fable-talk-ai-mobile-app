import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export type AgentBarProps = {
  name: string;
  description: string;
  tags: string[];
  avatarSource: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};
