import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AllNavigationParamList } from './types.ts';

const useNavigationRoutes = () => {
  const navigation = useNavigation<StackNavigationProp<AllNavigationParamList>>();

  return { navigation };
};

export default useNavigationRoutes;
