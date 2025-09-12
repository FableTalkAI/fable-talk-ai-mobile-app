import { StyleProp, ViewStyle } from 'react-native';

export type HeaderProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
