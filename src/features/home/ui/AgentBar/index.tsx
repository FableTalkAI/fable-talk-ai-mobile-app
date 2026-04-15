import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import { Tag as TagType } from '@/features/agents/store/agents/types.ts';
import Tag from '@/features/onboarding/ui/Tag';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { GearIcon, PremiumAgentIcon, WarningTriangleIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import AutoImage from '@/shared/ui/AutoImage';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { AgentBarModes, AgentBarProps } from './types.ts';

const AgentBar = memo(
  ({
    name,
    description,
    tags,
    avatarSource,
    style,
    wrapperStyle,
    onPress,
    mode = AgentBarModes.Default,
  }: AgentBarProps) => {
    const { colors, setColorOpacity } = useTheme();
    const { t } = useTranslation();

    const progress = useSharedValue(0);
    const shakeAngle = useSharedValue(0);

    const { getAgentsHandler, getMyAgentsHandler } = useAgentsStore();
    const { setFilterTagsHandler } = useUserStore();

    const isPremiumAgent = mode === AgentBarModes.Premium;
    const gradientColors = useMemo(
      () => (isPremiumAgent ? [colors.backgroundBase, colors.premium] : [colors.backgroundBase, colors.backgroundBase]),
      [colors.backgroundBase, colors.premium, isPremiumAgent],
    );

    const computedStyles = StyleSheet.create({
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
      onModerationBlurWrapper: {
        borderColor: colors.gray40,
      },
      rejectBlurWrapper: {
        borderColor: colors.errorDark,
      },
      onModerationBlur: {
        backgroundColor: setColorOpacity(colors.gray70, 0.85),
      },
      rejectBlur: {
        backgroundColor: setColorOpacity(colors.errorDark, 0.6),
      },
      onModerationText: {
        backgroundColor: colors.gray40,
      },
      rejectText: {
        backgroundColor: colors.errorDark,
      },
    });

    const animatedGearStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${progress.value * 360}deg` }],
      };
    });

    const animatedWarningStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${shakeAngle.value}deg` }],
      };
    });

    const onTagLongPress = useCallback(
      (tag: TagType) => {
        setFilterTagsHandler([tag]);

        getAgentsHandler().catch(console.error);
        getMyAgentsHandler().catch(console.error);
      },
      [getAgentsHandler, getMyAgentsHandler, setFilterTagsHandler],
    );

    useEffect(() => {
      if (mode === AgentBarModes.OnModeration) {
        progress.value = withRepeat(withTiming(1, { duration: 5000, easing: Easing.bounce }), -1, false);
      }

      if (mode === AgentBarModes.Rejected) {
        shakeAngle.value = 0;

        const ANGLE = 4;
        const SHAKE_DURATION = 100;
        const PAUSE_DURATION = 1500;

        shakeAngle.value = withRepeat(
          withSequence(
            withTiming(ANGLE, { duration: SHAKE_DURATION }),
            withTiming(-ANGLE, { duration: SHAKE_DURATION }),
            withTiming(ANGLE, { duration: SHAKE_DURATION }),
            withTiming(-ANGLE, { duration: SHAKE_DURATION }),
            withTiming(0, { duration: SHAKE_DURATION }),
            withTiming(0, { duration: PAUSE_DURATION }),
          ),
          -1,
          false,
        );
      }
    }, [mode, progress, shakeAngle]);

    const modeContent = useMemo(() => {
      if (mode === AgentBarModes.Premium) {
        return (
          <PremiumAgentIcon style={[styles.primaryAgentIcon, computedStyles.primaryAgentIcon]} fill={colors.premium} />
        );
      }

      if (mode === AgentBarModes.OnModeration) {
        return (
          <View style={[styles.onBlurWrapper, computedStyles.onModerationBlurWrapper, StyleSheet.absoluteFill]}>
            <View style={[StyleSheet.absoluteFill, computedStyles.onModerationBlur]} />

            <View style={styles.blurContainer}>
              <Animated.View style={animatedGearStyle}>
                <GearIcon />
              </Animated.View>

              <TextCustom
                numberOfLines={1}
                adjustsFontSizeToFit
                mode={TextModes.Base}
                style={[styles.textBlur, computedStyles.onModerationText]}
                textColor={colors.textLight}
                text={t('home.onModeration')}
              />
            </View>
          </View>
        );
      }

      if (mode === AgentBarModes.Rejected) {
        return (
          <PressableCustom
            onPress={onPress}
            containerStyle={[StyleSheet.absoluteFill]}
            style={[styles.onBlurWrapper, computedStyles.rejectBlurWrapper]}
          >
            <View style={[StyleSheet.absoluteFill, computedStyles.rejectBlur]} />

            <View style={styles.blurContainer}>
              <Animated.View style={animatedWarningStyle}>
                <WarningTriangleIcon style={styles.warningIcon} width={50} height={50} fill={colors.warningBase} />
              </Animated.View>

              <TextCustom
                numberOfLines={1}
                adjustsFontSizeToFit
                mode={TextModes.Base}
                style={[styles.textBlur, computedStyles.rejectText]}
                textColor={colors.textLight}
                text={t('home.needEdit')}
              />
            </View>
          </PressableCustom>
        );
      }

      return null;
    }, [
      animatedGearStyle,
      animatedWarningStyle,
      colors.premium,
      colors.textLight,
      colors.warningBase,
      computedStyles.onModerationBlur,
      computedStyles.onModerationBlurWrapper,
      computedStyles.onModerationText,
      computedStyles.primaryAgentIcon,
      computedStyles.rejectBlur,
      computedStyles.rejectBlurWrapper,
      computedStyles.rejectText,
      mode,
      onPress,
      t,
    ]);

    return (
      <LinearGradient colors={gradientColors} locations={[0.2, 1]} style={[styles.wrapper, wrapperStyle]}>
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
            nestedScrollEnabled
            data={tags}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Tag onLongPress={onTagLongPress} tag={item} forceActive />}
          />
        </PressableCustom>

        {modeContent}
      </LinearGradient>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    boxShadow: BOX_SHADOW.medium,
    borderRadius: RADIUS.medium,
  },
  onBlurWrapper: {
    overflow: 'hidden',
    borderRadius: RADIUS.medium,
    borderWidth: 2,
  },
  blurContainer: {
    height: '100%',
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
  warningIcon: {
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
  },
  textBlur: {
    fontWeight: 600,
    textAlign: 'center',
    paddingVertical: SPACING.xxs,
    width: '100%',
  },
  name: {
    textAlign: 'center',
    paddingHorizontal: SPACING.xxs,
  },
});

export default AgentBar;
