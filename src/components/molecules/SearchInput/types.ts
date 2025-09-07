import { StackNavigationProp } from '@react-navigation/stack';

import { AllNavigationParamList } from '@/hooks/useNavigationRoutes/types.ts';

export type SearchInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  withBackArrow?: boolean;
  isDisabled?: boolean;
  navigation?: StackNavigationProp<AllNavigationParamList>;
};
