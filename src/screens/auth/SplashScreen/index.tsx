import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { LogoIcon, SplashRobotIcon } from '@/assets/icons';
import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import OptionBar from '@/components/molecules/OptionBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const SplashScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    logoContainer: {
      gap: SPACING.xs,
    },
    text: {
      color: colors.textLight,
    },
    buttonContainer: {
      gap: SPACING.xs,
      marginTop: SPACING.lg,
    },
  });

  return (
    <>
      <LinearGradient colors={[colors.accentLight, colors.primary100]} locations={[0.2, 0.9]} style={styles.gradient} />
      <OptionBar title="sadasd" subtitle="sdsad" />
      <SafeAreaViewCustom isTransparent style={styles.safeAreaView}>
        <View style={[styles.logoContainer, computedStyles.logoContainer]}>
          <LogoIcon />
          <TextCustom text="FableTalkAI" mode="subtitle" />
        </View>
        <TextInputCustom withBackArrow placeholder="asdasdsad" shadowMode="medium" />
        <SplashRobotIcon width={SCREEN_WIDTH} />

        <View style={styles.bottomContainer}>
          <TextCustom text={t('auth.splashText')} mode="xxl" style={computedStyles.text} />

          <View style={[styles.buttonContainer, computedStyles.buttonContainer]}>
            {/*TODO: add onPress navigation to SignInUpScreen*/}
            <Button title={t('auth.signIn')} mode="light" radius="small" />
            <Button title={t('auth.signUp')} mode="transparent" radius="small" />
          </View>
        </View>
      </SafeAreaViewCustom>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradient: {
    position: 'absolute',
    inset: 0,
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomContainer: {
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default SplashScreen;
