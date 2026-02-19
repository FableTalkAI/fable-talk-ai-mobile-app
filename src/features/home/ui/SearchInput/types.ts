import { StackNavigationProp } from '@react-navigation/stack';
import { StyleProp, ViewStyle } from 'react-native';

import { AllNavigationParamList } from '@/features/navigation/hooks/useNavigationRoutes/types.ts';
import { TextInputCustomProps } from '@/shared/ui/TextInputCustom/types.ts';

export type SearchInputProps = {
  onStop: (value: string) => void;
  isDisabled?: boolean;
  navigation?: StackNavigationProp<AllNavigationParamList>;
  style?: StyleProp<ViewStyle>;
} & TextInputCustomProps;
