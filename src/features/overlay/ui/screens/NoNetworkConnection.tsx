import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeIn,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { NoWifiIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import Button from '@/shared/ui/Button';
import { ButtonModes } from '@/shared/ui/Button/types.ts';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const NoNetworkConnection = () => {
  const { t } = useTranslation();
  const { colors, theme, setColorOpacity } = useTheme();
  const [isChecking, setIsChecking] = useState(false);

  const radarValue = useSharedValue(0);
  const rotateValue = useSharedValue(0);

  useEffect(() => {
    radarValue.value = withRepeat(withTiming(1, { duration: 2500 }), -1, false);
    rotateValue.value = withRepeat(withTiming(360, { duration: 25000 }), -1, false);
  }, [radarValue, rotateValue]);

  const gradientColors =
    theme === 'dark'
      ? [colors.primary100, colors.primary80, colors.theme]
      : [colors.primary30, colors.primary60, colors.theme];

  const radarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(radarValue.value, [0, 1], [0.8, 1.5]) }],
    opacity: interpolate(radarValue.value, [0, 0.8, 1], [0.8, 0.4, 0]),
  }));

  const slowRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const computedStyles = StyleSheet.create({
    circleOuterRing: {
      borderColor: colors.gray20,
    },
    circleInner: {
      backgroundColor: colors.primary60,
    },
    pulseRingInner: {
      backgroundColor: colors.primary40,
    },
    iconWrapper: {
      backgroundColor: colors.backgroundQuaternary,
    },
    subtitleWrapper: {
      backgroundColor: setColorOpacity(colors.gray90, 0.3),
    },
  });

  const handleRetry = async () => {
    if (isChecking) return;
    setIsChecking(true);

    setTimeout(async () => {
      await NetInfo.refresh();
      setIsChecking(false);
    }, 800);
  };

  return (
    <SafeAreaViewCustom>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.4, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
        <View style={styles.topSection}>
          <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.iconSection}>
            <View style={styles.decorativeContainer}>
              <Animated.View style={[styles.circleOuter, slowRotateStyle]}>
                <View style={[styles.circleOuterRing, computedStyles.circleOuterRing]} />
              </Animated.View>

              <View style={[styles.circleInner, computedStyles.circleInner]} />
            </View>

            <Animated.View style={[styles.pulseRing, radarStyle]}>
              <View style={[styles.pulseRingInner, computedStyles.pulseRingInner]} />
            </Animated.View>

            <Animated.View style={[styles.iconWrapper, computedStyles.iconWrapper]}>
              <NoWifiIcon width={64} height={64} fill={colors.iconPrimary} />
            </Animated.View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.textContainer}>
            <TextCustom
              text={t('noConnection.title')}
              mode={TextModes.Xl}
              textColor={colors.textLight}
              numberOfLines={1}
              adjustsFontSizeToFit
            />

            <View style={[styles.subtitleWrapper, computedStyles.subtitleWrapper]}>
              <TextCustom
                text={t('noConnection.description')}
                textColor={colors.textLight}
                mode={TextModes.Secondary}
                style={styles.subtitleText}
              />
            </View>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)}>
          <Button title={t('actions.retry')} mode={ButtonModes.Primary} onPress={handleRetry} isLoading={isChecking} />
        </Animated.View>
      </Animated.View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  decorativeContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleOuter: {
    position: 'absolute',
    width: 280,
    height: 280,
  },
  circleOuterRing: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.circle,
    borderWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.4,
  },
  circleInner: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: RADIUS.circle,
    opacity: 0.15,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  pulseRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: RADIUS.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRingInner: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.circle,
  },
  iconWrapper: {
    width: 140,
    height: 140,
    borderRadius: RADIUS.circle,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: BOX_SHADOW.medium,
  },
  textContainer: {
    alignItems: 'center',
    gap: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  subtitleWrapper: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.m,
    borderRadius: RADIUS.large,
  },
  subtitleText: {
    textAlign: 'center',
  },
});

export default NoNetworkConnection;
