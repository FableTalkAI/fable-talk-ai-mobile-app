
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { AddAgentIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import PressableCustom from '@/shared/ui/PressableCustom';

import {CreateAgentButtonProps} from './types.ts';

const CreateAgentButton = ({ style }: CreateAgentButtonProps) => {
  const { navigation } = useNavigationRoutes();
  const { colors } = useTheme();

  const navigateToCreateAgent = () => navigation.navigate('CreateAgent');

  return (
    <PressableCustom containerStyle={style} onPress={navigateToCreateAgent}>
      <AddAgentIcon width={42} height={36} fill={colors.link} />
    </PressableCustom>
  );
};

export default CreateAgentButton;
