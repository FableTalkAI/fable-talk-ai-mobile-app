import { useRoute } from '@react-navigation/native';
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

  if (mode === 'signIn') {
    return (
      <SafeAreaViewCustom isTransparent style={styles.safeArea}>
        <View style={styles.wrapper}>
          <View>
            {/*Figma 32px, SafeArea 24, should I add 12 px more, or 24 enough*/}
            <View style={[computedStyles.iconContainer, styles.iconContainer]}>
              <SignInIcon />
            </View>

            <View>
              <TextCustom text={t('auth.signIn.header')} mode={TextModes.Title} />
              <TextCustom text={t('auth.signIn.subheader')} mode={TextModes.Caption} style={computedStyles.subheader} />
              <TextInputCustom value="" placeholder={t('auth.email')} leftIcon={<MailIcon />} />
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
            <Button title={t('auth.signInButton')} onPress={() => navigation.navigate('CodeVerification')} />

            <View style={[computedStyles.belowButtonContainer, styles.belowButtonContainer]}>
              <TextCustom
                text={t('auth.signIn.belowButton')}
                mode={TextModes.Caption}
                style={computedStyles.belowButtonText}
              />
              <PressableCustom onPress={() => navigation.navigate('SignInUp', { mode: 'signUp' })}>
                <TextCustom text={t('auth.signUpButton')} mode={TextModes.Caption} style={computedStyles.textLink} />
              </PressableCustom>
            </View>
          </View>
        </View>
      </SafeAreaViewCustom>
    );
  }

  if (mode === 'signUp') {
    return (
      <SafeAreaViewCustom isTransparent style={styles.safeArea}>
        <View style={styles.wrapper}>
          <View>
            {/*Figma 32px, SafeArea 24, should I add 12 px more, or 24 enough*/}
            <View style={[computedStyles.iconContainer, styles.iconContainer]}>
              <SignUpIcon />
            </View>

            <View>
              <TextCustom text={t('auth.signUp.header')} mode={TextModes.Title} />
              <TextCustom text={t('auth.signUp.subheader')} mode={TextModes.Caption} style={computedStyles.subheader} />
              {/*UserIcon Height too large? discuss*/}
              <TextInputCustom value="" placeholder={t('auth.name')} leftIcon={<UserIcon />} />
              <TextInputCustom
                value=""
                placeholder={t('auth.email')}
                leftIcon={<MailIcon />}
                wrapperStyle={computedStyles.secondTextInput}
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
            <Button title={t('auth.signUpButton')} onPress={() => navigation.navigate('CodeVerification')} />

            <View style={[computedStyles.belowButtonContainer, styles.belowButtonContainer]}>
              <TextCustom
                text={t('auth.signIn.belowButton')}
                mode={TextModes.Caption}
                style={computedStyles.belowButtonText}
              />
              <PressableCustom onPress={() => navigation.navigate('SignInUp', { mode: 'signIn' })}>
                <TextCustom text={t('auth.signInButton')} mode={TextModes.Caption} style={computedStyles.textLink} />
              </PressableCustom>
            </View>
          </View>
        </View>
      </SafeAreaViewCustom>
    );
  }

  return null;
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
