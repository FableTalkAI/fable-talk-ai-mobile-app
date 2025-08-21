import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { GoogleLogoIcon, MailIcon, SignInIcon, SignUpIcon, UserIcon } from '@/assets/icons';
import Button from '@/components/atoms/Button';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useTheme from '@/hooks/useTheme.ts';

import { SignInUpRouteProp } from './types.ts';

const SignInUpScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const route = useRoute<SignInUpRouteProp>();
  const { navigation } = useNavigationRoutes();
  const { mode } = route.params;
  const [screenMode, setScreenMode] = useState<'signIn' | 'signUp'>(mode);

  const computedStyles = StyleSheet.create({
    iconContainer: {
      paddingBottom: SPACING.lg,
    },
    subheader: {
      paddingBottom: SPACING.s,
    },
    continueWithContainer: {
      paddingTop: SPACING.m,
      gap: SPACING.xs,
    },
    continueWithText: {
      color: colors.gray40,
    },
    buttonAndTextContainer: {
      paddingBottom: SPACING.s,
    },
    belowButtonContainer: {
      paddingTop: SPACING.xs,
    },
    belowButtonText: {
      color: colors.textSecondary,
    },
    textLink: {
      color: colors.link,
    },
    secondTextInput: {
      paddingTop: SPACING.lg,
    },
  });

  return (
    <SafeAreaViewCustom isTransparent style={styles.safeArea}>
      <View style={styles.wrapper}>
        <View>
          <View style={[computedStyles.iconContainer, styles.iconContainer]}>
            {screenMode === 'signIn' ? <SignInIcon /> : <SignUpIcon />}
          </View>

          <View>
            <TextCustom text={t(`auth.${screenMode}.header`)} mode={TextModes.Title} />
            <TextCustom
              text={t(`auth.${screenMode}.subheader`)}
              mode={TextModes.Caption}
              style={computedStyles.subheader}
            />
            {screenMode === 'signUp' && (
              <TextInputCustom value="" placeholder={t('common.name')} leftIcon={<UserIcon />} />
            )}
            <TextInputCustom
              value=""
              placeholder={t('common.email')}
              leftIcon={<MailIcon />}
              wrapperStyle={screenMode === 'signUp' ? computedStyles.secondTextInput : undefined}
            />
          </View>

          <View style={[computedStyles.continueWithContainer, styles.continueWithContainer]}>
            <TextCustom
              text={t('auth.continueWith')}
              mode={TextModes.Caption}
              style={computedStyles.continueWithText}
            />
            <PressableCustom>
              <GoogleLogoIcon />
            </PressableCustom>
          </View>
        </View>

        <View style={computedStyles.buttonAndTextContainer}>
          <Button title={t(`auth.${screenMode}Button`)} onPress={() => navigation.navigate('CodeVerification')} />

          <View style={[computedStyles.belowButtonContainer, styles.belowButtonContainer]}>
            <TextCustom
              text={t(`auth.${screenMode}.belowButton`)}
              mode={TextModes.Caption}
              style={computedStyles.belowButtonText}
            />
            <PressableCustom onPress={() => setScreenMode(screenMode === 'signIn' ? 'signUp' : 'signIn')}>
              <TextCustom
                text={screenMode === 'signIn' ? t('auth.signUpButton') : t('auth.signInButton')}
                mode={TextModes.Caption}
                style={computedStyles.textLink}
              />
            </PressableCustom>
          </View>
        </View>
      </View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
  },
  continueWithContainer: {
    alignItems: 'center',
  },
  belowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignInUpScreen;
