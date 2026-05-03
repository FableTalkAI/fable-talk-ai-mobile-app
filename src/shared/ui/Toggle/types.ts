import { Dispatch, SetStateAction } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ToggleProps = {
  isActive: boolean;
  setIsActive?: Dispatch<SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>;
};
