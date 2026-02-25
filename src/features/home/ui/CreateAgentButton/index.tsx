import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { AddAgentIcon, ArrowStickIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';

import { CreateAgentButtonProps } from './types.ts';

const CreateAgentButton = ({ style, withArrow }: CreateAgentButtonProps) => {
  const { navigation } = useNavigationRoutes();
  const { colors } = useTheme();

  const translateY = useSharedValue(0);

  const navigateToCreateAgent = () => navigation.navigate('CreateAgent');

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-10, {
        duration: 1000,
      }),
      -1,
      true,
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <PressableCustom containerStyle={style} onPress={navigateToCreateAgent}>
      {withArrow && (
        <Animated.View entering={FadeIn} style={[styles.arrow, animatedStyle]}>
          <ArrowStickIcon width={24} height={24} fill={colors.textPrimary} />
        </Animated.View>
      )}

      <AddAgentIcon width={42} height={36} fill={colors.link} />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  arrow: {
    alignSelf: 'center',
    marginBottom: SPACING.xs,
  },
});

export default CreateAgentButton;
