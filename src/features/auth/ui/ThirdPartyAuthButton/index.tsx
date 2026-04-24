import { StyleSheet } from 'react-native';

import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import ComponentLoader from '@/shared/ui/ComponentLoader';
import PressableCustom from '@/shared/ui/PressableCustom';

import { GoogleButtonProps } from './types.ts';

const ThirdPartyAuthButton = ({ isLoading, onPress, icon }: GoogleButtonProps) => {
  return (
    <PressableCustom onPress={onPress} disabled={isLoading} style={styles.container}>
      {icon}
      <ComponentLoader isVisible={isLoading} />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: RADIUS.circle,
    padding: SPACING.xxs,
  },
});

export default ThirdPartyAuthButton;
