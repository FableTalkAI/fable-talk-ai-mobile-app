import { StyleProp, ViewStyle } from 'react-native';
import { BannerAdSize } from 'react-native-google-mobile-ads';

export type AdBannerProps = {
  size?: BannerAdSize;
  style?: StyleProp<ViewStyle>;
};
