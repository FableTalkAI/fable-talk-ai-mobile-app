import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import Tag from '@/features/onboarding/ui/Tag';
import { GearIcon, PremiumAgentIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import AutoImage from '@/shared/ui/AutoImage';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { AgentBarModes, AgentBarProps } from './types.ts';

const AgentBar = ({
  name,
  description,
  tags,
  avatarSource,
  style,
  onPress,
  mode = AgentBarModes.Default,
}: AgentBarProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const progress = useSharedValue(0);

  const isPremiumAgent = mode === AgentBarModes.Premium;
  const gradientColors = useMemo(
    () => (isPremiumAgent ? [colors.backgroundBase, colors.premium] : [colors.backgroundBase, colors.backgroundBase]),
    [colors.backgroundBase, colors.premium, isPremiumAgent],
  );

  const computedStyles = StyleSheet.create({
    wrapper: {
      width: (SCREEN_WIDTH - SPACING.xl * 2 - SPACING.lg) / 2,
    },
    pressableContainer: {
      borderColor: isPremiumAgent ? colors.premium : 'transparent',
    },
    name: {
      color: colors.textPrimary,
    },
    description: {
      color: colors.textSecondary,
    },
    primaryAgentIcon: {
      shadowColor: colors.theme,
    },
    onModerationWrapper: {
      borderColor: colors.gray40,
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 360}deg` }],
    };
  });

  useEffect(() => {
    if (mode !== AgentBarModes.OnModeration) return;

    progress.value = withRepeat(withTiming(1, { duration: 5000, easing: Easing.bounce }), -1, false);
  }, [mode, progress]);

  const baseAgentBar = useMemo(
    () => (
      <LinearGradient colors={gradientColors} locations={[0.2, 1]} style={[styles.wrapper, computedStyles.wrapper]}>
        <PressableCustom
          style={[computedStyles.pressableContainer, styles.pressableContainer, style]}
          onPress={onPress}
        >
          <AutoImage source={avatarSource} style={styles.avatar} resizeMode="cover" />

          <TextCustom
            numberOfLines={1}
            text={name}
            mode={TextModes.Secondary}
            style={[styles.name, computedStyles.name]}
          />
          <TextCustom
            text={description}
            mode={TextModes.ExtraSmall}
            style={[computedStyles.description, styles.description]}
            numberOfLines={2}
          />

          <FlatList
            horizontal
            data={tags}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            renderItem={({ item }) => <Tag title={item} forceActive />}
          />
        </PressableCustom>
      </LinearGradient>
    ),
    [avatarSource, computedStyles, description, gradientColors, name, onPress, style, tags],
  );

  if (mode === AgentBarModes.Premium) {
    return (
      <View>
        {baseAgentBar}

        <PremiumAgentIcon style={[styles.primaryAgentIcon, computedStyles.primaryAgentIcon]} fill={colors.premium} />
      </View>
    );
  }

  if (mode === AgentBarModes.OnModeration) {
    return (
      <View style={[styles.onModerationWrapper, computedStyles.onModerationWrapper]}>
        {baseAgentBar}

        <BlurView
          reducedTransparencyFallbackColor="white"
          blurType="light"
          blurAmount={5}
          style={[styles.blurContainer, StyleSheet.absoluteFill]}
        >
          <Animated.View style={animatedStyle}>
            <GearIcon />
          </Animated.View>

          <TextCustom
            mode={TextModes.Base}
            style={styles.textBlur}
            textColor={colors.textPrimary}
            text={t('common.onModeration')}
          />
        </BlurView>
      </View>
    );
  }

  return baseAgentBar;
};

const styles = StyleSheet.create({
  wrapper: {
    boxShadow: BOX_SHADOW.medium,
    borderRadius: RADIUS.medium,
  },
  onModerationWrapper: {
    borderWidth: 2,
    borderRadius: RADIUS.medium,
    overflow: 'hidden',
  },
  blurContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.m,
  },
  pressableContainer: {
    alignItems: 'center',
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.m,
    gap: SPACING.xxs,
    borderWidth: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.circle,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: SPACING.s,
    height: 24,
    textAlignVertical: 'center',
  },
  flatList: {
    maxHeight: 40,
    paddingVertical: SPACING.xxs,
  },
  flatListContainer: {
    paddingHorizontal: SPACING.m,
    gap: SPACING.xxs,
  },
  primaryAgentIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  textBlur: {
    fontWeight: 600,
  },
  name: {
    textAlign: 'center',
    paddingHorizontal: SPACING.xxs,
  },
});

export default AgentBar;
