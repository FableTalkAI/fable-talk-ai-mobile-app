import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeIn,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { RootNavigatorParamList } from '@/features/navigation/ui/RootNavigator/types.ts';
import { RocketIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import { ButtonModes } from '@/shared/ui/Button/types.ts';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const AppUpdateStub = () => {
  const { t } = useTranslation();
  const { colors, theme, setColorOpacity } = useTheme();
  const route = useRoute<RouteProp<RootNavigatorParamList, 'AppUpdateStub'>>();

  const updateUrl = route.params?.url;

  const floatValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);
  const rotateValue = useSharedValue(0);

  floatValue.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
  pulseValue.value = withRepeat(withSpring(1.1, { damping: 20, stiffness: 80 }), -1, true);
  rotateValue.value = withRepeat(withTiming(360, { duration: 20000 }), -1, false);

  const gradientColors =
    theme === 'dark'
      ? [colors.primary100, colors.primary80, colors.theme]
      : [colors.primary30, colors.primary60, colors.theme];

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(floatValue.value, [0, 1], [0, -12]) }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
    opacity: interpolate(pulseValue.value, [1, 1.1], [0.6, 0.3]),
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
    sparkleDot: {
      backgroundColor: colors.primary10,
    },
    subtitleWrapper: {
      backgroundColor: setColorOpacity(colors.gray90, 0.3),
    },
  });

  const handleUpdate = () => {
    if (updateUrl) {
      Linking.openURL(updateUrl);
    }
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

            <Animated.View style={[styles.pulseRing, pulseStyle]}>
              <View style={[styles.pulseRingInner, computedStyles.pulseRingInner]} />
            </Animated.View>

            <Animated.View style={[styles.iconWrapper, computedStyles.iconWrapper, floatStyle]}>
              <RocketIcon style={styles.icon} />
              <View style={[styles.sparkleDot, computedStyles.sparkleDot]} />
            </Animated.View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.textContainer}>
            <TextCustom
              text={t('update.title')}
              mode={TextModes.Xl}
              textColor={colors.textLight}
              style={styles.title}
              numberOfLines={1}
              adjustsFontSizeToFit
            />

            <View style={[styles.subtitleWrapper, computedStyles.subtitleWrapper]}>
              <TextCustom text={t('update.description')} textColor={colors.textLight} style={styles.subtitle} />
            </View>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)}>
          <Button title={t('actions.update')} mode={ButtonModes.Primary} onPress={handleUpdate} />
        </Animated.View>
      </Animated.View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative',
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
    width: 180,
    height: 180,
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
  },
  icon: {
    width: 70,
    height: 70,
  },
  sparkleDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: RADIUS.circle,
  },
  textContainer: {
    alignItems: 'center',
    gap: SPACING.m,
  },
  title: {
    textAlign: 'center',
  },
  subtitleWrapper: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.large,
  },
  subtitle: {
    textAlign: 'center',
  },
});

export default AppUpdateStub;
