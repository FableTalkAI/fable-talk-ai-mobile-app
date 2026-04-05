import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { showToast } from '@/features/overlay/services/showToast.ts';
import useSubscription from '@/features/subscriptions/hooks/useSubscription.tsx';
import { AddAgentIcon, ArrowStickIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';

import { CreateAgentButtonProps } from './types.ts';

const CreateAgentButton = ({ style, withArrow, hasModerationLimit }: CreateAgentButtonProps) => {
  const { navigation } = useNavigationRoutes();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { checkPremiumHandler } = useSubscription();

  const translateY = useSharedValue(0);

  const navigateToCreateAgentHandler = () => {
    checkPremiumHandler(() => {
      if (hasModerationLimit) {
        showToast({
          type: 'error',
          text2: t('createAgent.agentCreateLimit'),
          position: 'bottom',
          visibilityTime: 5000,
        });
        return;
      }

      navigation.navigate('CreateAgent');
    });
  };

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
    <PressableCustom containerStyle={style} onPress={navigateToCreateAgentHandler}>
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
