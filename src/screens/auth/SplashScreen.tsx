import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { LogoIcon, SplashRobotIcon } from '@/assets/icons';
import Button from '@/components/atoms/Button';
import { ButtonModes, ButtonRadius } from '@/components/atoms/Button/types.ts';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useTheme from '@/hooks/useTheme.ts';

import { AuthScreenMode } from './SignInUpScreen/types.ts';

const SplashScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { navigation } = useNavigationRoutes();

  const computedStyles = StyleSheet.create({
    logoContainer: {
      gap: SPACING.xs,
    },
    text: {
      color: colors.textLight,
    },
    buttonWrapper: {
      gap: SPACING.xs,
      marginTop: SPACING.lg,
    },
  });

  return (
    <>
      <LinearGradient colors={[colors.accentLight, colors.primary100]} locations={[0.2, 0.9]} style={styles.gradient} />

      <SafeAreaViewCustom isTransparent style={styles.safeAreaView}>
        <View style={[styles.logoContainer, computedStyles.logoContainer]}>
          <LogoIcon />
          <TextCustom text="FableTalkAI" mode={TextModes.Subtitle} />
        </View>

        <SplashRobotIcon />

        <View style={styles.bottomContainer}>
          <TextCustom text={t('auth.splashText')} mode={TextModes.Xxl} style={computedStyles.text} />

          <View style={[styles.buttonWrapper, computedStyles.buttonWrapper]}>
            <Button
              containerStyle={styles.button}
              title={t('auth.signInButton')}
              mode={ButtonModes.Light}
              radius={ButtonRadius.Small}
              onPress={() => navigation.navigate('SignInUp', { mode: AuthScreenMode.SignIn })}
            />
            <Button
              containerStyle={styles.button}
              title={t('auth.signUpButton')}
              mode={ButtonModes.Transparent}
              radius={ButtonRadius.Small}
              onPress={() => navigation.navigate('SignInUp', { mode: AuthScreenMode.SignUp })}
            />
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
  buttonWrapper: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});

export default SplashScreen;
