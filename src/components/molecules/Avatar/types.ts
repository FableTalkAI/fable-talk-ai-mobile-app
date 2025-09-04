import { StyleProp, ViewStyle } from 'react-native';

export type AvatarProps = {
  size?: number;
  isChangeable?: boolean;
  avatarUri?: string;
  setAvatarUri?: (uri: string) => void;
  style?: StyleProp<ViewStyle>;
};
