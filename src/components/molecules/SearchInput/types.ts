import { StackNavigationProp } from '@react-navigation/stack';
import { StyleProp, ViewStyle } from 'react-native';

import { AllNavigationParamList } from '@/hooks/useNavigationRoutes/types.ts';

export type SearchInputProps = {
  value: string;
  placeholder?: string;
  withBackArrow?: boolean;
  withFilter?: boolean;
  navigation?: StackNavigationProp<AllNavigationParamList>;
  wrapperStyle?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
};
